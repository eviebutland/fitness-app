import { Request, Response } from 'express'
import { QueryResult, QueryResultRow } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

const workoutJoinQuery = `SELECT w.id,  w.name as workoutName, e.name AS set_1_exercise_name, 
e.description AS set_1_description,
e.recommendedreprange AS set_1_repranage,
e.intensity AS set_1_intensity,
e.exerciseTime AS set_1_excercisetime,
e.video AS set_1_video,
e.variations AS set_1_variations,

e2.name AS set_2_exercise_name, e2.description  AS set_2_description, 
e2.recommendedreprange AS set_2_repranage,
e2.intensity AS set_2_intensity,
e2.exerciseTime AS set_2_excercisetime,
e2.video AS set_2_video,
e2.variations AS set_2_variations,

e3.name AS set_3_exercise_name, 
e3.description AS set_3_description,
e3.recommendedreprange AS set_3_repranage,
e3.intensity AS set_3_intensity,
e3.exerciseTime AS set_3_excercisetime,
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
export const getAllWorkouts = async (request: Request, response: Response) => {
  try {
    await client.query('BEGIN TRANSACTION')

    const results: QueryResult = await client.query(workoutJoinQuery)
    const formattedResult = formatWorkoutJoin(results)

    // Is this possible to be done in the query?
    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: formattedResult, total: results.rowCount })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

// get by name also?
export const getWorkoutByID = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.status(400).json({ message: 'Please provide an ID' })
  }
  try {
    await client.query('BEGIN TRANSACTION')
    const query = workoutJoinQuery + ` WHERE w.ID = ${request.params.id}`

    const results: QueryResult = await client.query(query)

    const formattedResult = formatWorkoutJoin(results)

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: formattedResult })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getAllExercisesInCatergory = async (request: Request, response: Response) => {
  const query = workoutJoinQuery + ` WHERE w.name = '${request.params.catergory}'`

  // console.log(query)
  try {
    await client.query('BEGIN TRANSACTION')
    const results: QueryResult = await client.query(query)

    await client.query('COMMIT TRANSACTION')
    const formattedResult = formatWorkoutJoin(results)

    response.status(200).json({ data: formattedResult, total: results.rowCount })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

const formatWorkoutJoin = (results: QueryResult) => {
  return results.rows.map(row => {
    return {
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
  })
}
