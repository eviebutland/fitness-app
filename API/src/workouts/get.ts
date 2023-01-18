import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { WorkoutFormatted } from '../lib/types/workouts'
import { rollback } from '../utils/rollback'
import { CourierClient, ICourierClient } from '@trycourier/courier'
import { Context } from 'openapi-backend'
import { User } from '../lib/types/user'

const workoutJoinQuery = `SELECT w.id,  w.name as workoutName, e.name AS set_1_exercise_name, 
e.description AS set_1_description,
e.recommendedreprange AS set_1_repranage,
e.intensity AS set_1_intensity,
e.exercisetime AS set_1_excercisetime,
e.video AS set_1_video,
e.variations AS set_1_variations,

e2.name AS set_2_exercise_name, e2.description  AS set_2_description, 
e2.recommendedreprange AS set_2_repranage,
e2.intensity AS set_2_intensity,
e2.exercisetime AS set_2_excercisetime,
e2.video AS set_2_video,
e2.variations AS set_2_variations,

e3.name AS set_3_exercise_name, 
e3.description AS set_3_description,
e3.recommendedreprange AS set_3_repranage,
e3.intensity AS set_3_intensity,
e3.exercisetime AS set_3_excercisetime,
e3.video AS set_3_video,
e3.variations AS set_3_variations,
e.resttime FROM workouts w
RIGHT JOIN exercises e ON w.set_1 = e.id
RIGHT JOIN exercises e2 on w.set_2 = e2.id
RIGHT JOIN exercises e3 on w.set_3 = e3.id`

// const shorterQuery = `SELECT w.name as workoutname , e.*, e2.*, e3.* FROM workouts w
// RIGHT JOIN exercises e ON w.set_1 = e.id
// RIGHT JOIN exercises e2 on w.set_2 = e2.id
// RIGHT JOIN exercises e3 on w.set_3 = e3.id`
export const getAllWorkouts = async (api: Context, request: Request, response: Response): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')

    const results: QueryResult<WorkoutFormatted> = await client.query(workoutJoinQuery)

    const formattedResult: (WorkoutFormatted | null)[] = formatWorkoutJoin(results).filter(value => value !== null)

    // Is this possible to be done in the query?
    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: formattedResult, total: formattedResult.length })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getWorkoutByID = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(400).json({ message: 'Please provide an ID' })
    return
  }
  try {
    await client.query('BEGIN TRANSACTION')
    const query = workoutJoinQuery + ' WHERE w.ID = $1'

    const results: QueryResult = await client.query(query, [api.request.params.id])

    const formattedResult: (WorkoutFormatted | null)[] = formatWorkoutJoin(results).filter(value => value !== null)

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: formattedResult })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getAllExercisesInCatergory = async (
  api: Context,
  request: Request,
  response: Response
): Promise<void> => {
  try {
    if (typeof api.request.params.catergory === 'string' && api.request.params.catergory) {
      await client.query('BEGIN TRANSACTION')
      const results: WorkoutResults | undefined = await handleSelectAllExercisesInCategory(
        api.request.params.catergory,
        response
      )
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

const formatWorkoutJoin = (results: QueryResult) => {
  return results.rows.map(row => {
    const result: WorkoutFormatted = {
      id: row.id,
      workoutName: row.workoutname,
      resttime: row.resttime,
      set1: {
        name: row.set_1_exercise_name,
        description: row.set_1_description,
        variations: JSON.parse(row.set_1_variations),
        intensity: row.set_1_intensity,
        video: row.set_1_video,
        exerciseTime: row.set_1_excercisetime
      },
      set2: {
        name: row.set_2_exercise_name,
        description: row.set_2_description,
        variations: JSON.parse(row.set_2_variations),
        intensity: row.set_2_intensity,
        video: row.set_2_video,
        exerciseTime: row.set_2_excercisetime
      },
      set3: {
        name: row.set_3_exercise_name,
        description: row.set_3_description,
        variations: JSON.parse(row.set_3_variations),
        intensity: row.set_3_intensity,
        video: row.set_3_video,
        exerciseTime: row.set_3_excercisetime
      }
    }

    return result.id !== null ? result : null
  })
}

export const getTodaysWorkout = async (api: Context, request: Request, response: Response) => {
  // Based off the user's logged in workout preference find a workout that matches
  const user: User = api.request.user

  const userWorkoutPreference =
    typeof user.workoutpreference === 'string' ? JSON.parse(user.workoutpreference) : user?.workoutpreference
  const todaysDay = new Date().toLocaleString('en-gb', { weekday: 'long' })

  const todaysWorkoutCatergory = userWorkoutPreference[todaysDay.toLowerCase()]

  const workout: WorkoutResults | undefined = await handleSelectAllExercisesInCategory(
    todaysWorkoutCatergory.toLowerCase(),
    response
  )

  const courier: ICourierClient = CourierClient({ authorizationToken: 'pk_prod_MJAHFWSKV24TJXQJAV7KHKC975SW' })

  let selectedWorkout: WorkoutFormatted = {}

  const userCompletedWorkouts =
    typeof user.completedworkouts === 'string' ? JSON.parse(user.completedworkouts) : user.completedworkouts

  if (workout?.data.length && typeof workout?.data !== 'string') {
    // check if any of the workouts have been completed yet
    userCompletedWorkouts.forEach((completedWorkout: number) => {
      selectedWorkout =
        workout.data.find((workout: WorkoutFormatted) => completedWorkout !== Number(workout.id)) ?? []
    })
  }

  // add selected workout to completedWorkouts with API call

  try {
    const emailData = workout?.data[0] as WorkoutFormatted

    const { requestId } = await courier.send({
      message: {
        to: {
          email: 'evie.butland@gmail.com'
        },
        template: 'HBDVP38QPSMS4YG676E20DGYP7X6',
        data: {
          recipientName: 'Evie',
          workoutName: emailData.workoutName,
          set1: emailData.set1,
          set2: emailData.set2,
          set3: emailData.set3
        }
      }
    })
    console.log(requestId)

    if (selectedWorkout?.id) {
      const updatedCompletedWorkouts = [...userCompletedWorkouts, Number(selectedWorkout?.id)]

      // Update user to have completed the workout
      await client.query(
        `UPDATE users
        SET completedworkouts = $1
        WHERE id = ${api.request.user.id}
        `,
        [JSON.stringify(updatedCompletedWorkouts)]
      )
      await client.query('COMMIT TRANSACTION')
    }
    response.status(200).json({ message: 'Succesfully emailed', workout })
  } catch (error) {
    console.log(error)
    rollback(client)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

interface WorkoutResults {
  data: (WorkoutFormatted | null)[] | string
  total: number
}
const handleSelectAllExercisesInCategory = async (category: string, response: Response) => {
  const query = workoutJoinQuery + ` WHERE w.name = '${category}'`
  try {
    const results: QueryResult<WorkoutFormatted> = await client.query(query)

    if (results.rows.length) {
      const formattedResult: (WorkoutFormatted | null)[] = formatWorkoutJoin(results).filter(
        value => value !== null
      )

      const response: WorkoutResults | undefined = { data: formattedResult, total: formattedResult.length }
      return response
    } else {
      return { data: 'Rest day, take it easy!', total: 0 }
    }
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
