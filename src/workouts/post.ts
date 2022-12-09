import { Request, Response } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

export const createWorkout = async (request: Request, response: Response): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')

    const query = `INSERT INTO workouts (name, set_1, set_2, set_3)
    VALUES ($1, $2, $3, $4)`

    const values: string[] = Object.values(request.body)

    await client.query(query, [...values])
    await client.query('COMMIT TRANSACTION')

    response.status(201).json({ message: 'Successfully created new workout', data: request.body })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
