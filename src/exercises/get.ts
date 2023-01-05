import { Request, Response } from 'express'
import OpenAPIBackend, { Context, Document } from 'openapi-backend'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { Exercise } from '../lib/types/exercise'
import { rollback } from '../utils/rollback'

export const getAllExercises = async (
  c: Context<Document>,
  request: Request,
  response: Response
): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')

    const result: QueryResult<Exercise> = await client.query('SELECT * FROM exercises')

    await client.query('COMMIT TRANSACTION')
    // c.response.status(200).json({ message: 'Successful transaction', data: result.rows })
    console.log(c.response)
    console.log(c)
  } catch (error) {
    rollback(client)
    console.log(error)
    // c.response.json({ message: 'Something went wrong', error })
  }
}
