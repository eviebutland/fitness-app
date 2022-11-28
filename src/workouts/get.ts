import { Request, Response } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

export const getAllWorkouts = async (request: Request, response: Response) => {
  try {
    await client.query('BEGIN TRANSACTION')
    const query = `
    SELECT w.id,  w.name as workoutName, e.name AS set_1_exercise_name, 
    e.description AS set_1_description,
    e.recommendedreprange AS set_1_repranage,
    e.intensity AS set_1_intensity,
    e.exerciseTime AS set_1_excerciseTime,
    e.video AS set_1_video,
    e.variations AS set_1_variations,
    
    e2.name AS set_2_exercise_name, e2.description  AS set_2_description, 
    e2.recommendedreprange AS set_2_repranage,
    e2.intensity AS set_2_intensity,
    e2.exerciseTime AS set_2_excerciseTime,
    e2.video AS set_2_video,
    e2.variations AS set_2_variations,
    
    e3.name AS set_3_exercise_name, 
    e3.description AS set_3_description,
    e3.recommendedreprange AS set_3_repranage,
    e3.intensity AS set_3_intensity,
    e3.exerciseTime AS set_3_excerciseTime,
    e3.video AS set_3_video,
    e3.variations AS set_3_variations,
    e.resttime FROM workouts w
    LEFT JOIN exercises e ON w.set_1 = e.id
    LEFT JOIN exercises e2 on w.set_2 = e2.id
    LEFT JOIN exercises e3 on w.set_3 = e3.id   
    `

    const result = await client.query(query)

    // Is this possible to be done in the query?
    const formattedResult = result.rows.map(row => {
      return {
        id: row.id,
        workoutName: row.workoutname,
        set1: {
          name: row.set_1_exercise_name,
          description: row.set_1_description,
          variations: JSON.parse(row.set_1_variations),
          intensity: row.set_1_intensity,
          video: row.set_1_video
        },
        set2: {
          name: row.set_2_exercise_name,
          description: row.set_2_description,
          variations: JSON.parse(row.set_2_variations),
          intensity: row.set_2_intensity,
          video: row.set_2_video
        },
        set3: {
          name: row.set_3_exercise_name,
          description: row.set_3_description,
          variations: JSON.parse(row.set_3_variations),
          intensity: row.set_3_intensity,
          video: row.set_3_video
        }
      }
    })
    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: formattedResult, total: result.rowCount })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}

// get by name also?
export const getWorkoutByID = () => {
  // SELECT workouts.name as workoutName, set_3, exercises.name AS name FROM workouts
  // LEFT JOIN exercises ON workouts.set_3 = exercises.id
}
