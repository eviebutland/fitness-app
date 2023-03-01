import { Context } from 'openapi-backend'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { Request, Response } from 'express'

export const getAllWorkoutPlans = async (api: Context, request: Request, response: Response): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')
    const query = 'SELECT * FROM workoutPlans'
    const results = await client.query(query)
    console.log('running new endpoint', results.rows)
    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ data: results.rows })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
