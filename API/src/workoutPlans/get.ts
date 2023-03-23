import { Context, ParsedRequest } from 'openapi-backend'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { User } from '../lib/types/user'
import { WorkoutFormatted } from '../lib/types/workouts'
interface CompletedWorkouts {
  name: string
  workoutId: string
}
export const getAllWorkoutPlans = async (api: Context, request: Request, response: Response): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')
    const query = 'SELECT * FROM workoutPlans'
    const results: QueryResult<WorkoutFormatted> = await client.query(query)

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: results.rows })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getWorkoutPlanById = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(400).json({ message: 'Please provide an ID' })
    return
  }

  try {
    await client.query('BEGIN TRANSACTION')
    const query = `
      SELECT * FROM workoutPlans
      WHERE id = $1`

    const results: QueryResult = await client.query(query, [api.request.params.id])

    const formattedResult = results.rows.filter(value => value !== null)

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: formattedResult })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

const handleSelectAllExercisesInCategory = async (category: string, response: Response) => {
  const query = `
      SELECT * FROM workoutPlans
      WHERE title = '${category}'`
  try {
    const results: QueryResult<WorkoutFormatted> = await client.query(query)

    if (results.rows.length) {
      const formattedResult = results.rows.filter(value => value !== null)

      const response = { data: formattedResult, total: formattedResult.length }
      return response
    } else {
      return { data: 'REST', total: 0 }
    }
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

interface UserParsedRequest extends ParsedRequest {
  user: User
}
interface UserContext extends Context {
  request: UserParsedRequest
}

export const getTodaysWorkout = async (api: UserContext, request: Request, response: Response) => {
  // Based off the user's logged in workout preference find a workout that matches
  const user: User = api.request?.user
  const query = api.request.query.day as string
  const userWorkoutPreference =
    typeof user.workoutpreference === 'string' ? JSON.parse(user.workoutpreference) : user?.workoutpreference

  const todaysWorkoutCatergory = userWorkoutPreference[query]

  const workout = await handleSelectAllExercisesInCategory(todaysWorkoutCatergory.toLowerCase(), response)

  let selectedWorkout: WorkoutFormatted | null = { title: null, workout: null }

  const userCompletedWorkouts =
    typeof user.completedworkouts === 'string' ? JSON.parse(user.completedworkouts) : user.completedworkouts

  if (workout?.data.length && typeof workout.data !== 'string') {
    // check if any of the workouts have been completed yet
    userCompletedWorkouts.forEach((completedWorkout: CompletedWorkouts) => {
      selectedWorkout =
        (workout.data as WorkoutFormatted[]).find(workout => {
          return completedWorkout.workoutId !== workout.id
        }) ?? null
    })
  }

  response.status(200).json({ message: 'Succesfully sent', workout: selectedWorkout })
}

export const getAllExercisesInCatergory = async (
  api: Context,
  request: Request,
  response: Response
): Promise<void> => {
  try {
    if (typeof api.request.params.catergory === 'string' && api.request.params.catergory) {
      await client.query('BEGIN TRANSACTION')
      const results = await handleSelectAllExercisesInCategory(api.request.params.catergory, response)
      response.status(200).json(results)
    } else {
      response.status(404).json({ message: 'Please provide a catergory to search by' })
      return
    }

    await client.query('COMMIT TRANSACTION')
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
