import { Request, Response } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

export const getAllWorkouts = async (request: Request, response: Response) => {
  try {
    await client.query('BEGIN TRANSACTION')
    const query = `
    SELECT w.name as workoutName, e.name AS set_1, e2.name AS set_2, e3.name AS set_3 FROM workouts w
    LEFT JOIN exercises e ON w.set_1 = e.id
    LEFT JOIN exercises e2 on w.set_2 = e2.id
    LEFT JOIN exercises e3 on w.set_3 = e3.id
    `

    const result = await client.query(query)

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: result.rows, total: result.rowCount })
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
