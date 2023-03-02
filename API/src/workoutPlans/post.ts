import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

export const createWorkout = async (api: Context, request: Request, response: Response): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')

    const query = `INSERT INTO workoutPlans (title, workout)
    VALUES ($1, $2)`

    const values: string[] = Object.values(api.request.body)

    await client.query(query, [...values])
    await client.query('COMMIT TRANSACTION')

    response.status(201).json({ message: 'Successfully created new workout', data: api.request.body })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
