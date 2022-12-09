import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { Exercise } from '../lib/types/exercise'
import { rollback } from '../utils/rollback'

export const createExcerise = async (request: Request, response: Response): Promise<void> => {
  const query = `
  INSERT INTO exercises (name, description, restTime, recommendedRepRange, catergory, intensity, isCompound, exerciseTime, video, variations)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

  let model: Exercise = request.body

  model = {
    ...request.body,
    variations: JSON.stringify(request.body.variations)
  }

  try {
    await client.query('BEGIN TRANSACTION')

    // Check if name already exists and end transacation?
    // Can we make the name also a primary key

    // Add to new database
    const result: QueryResult<Exercise> = await client.query(query, Object.values(model))

    await client.query('COMMIT TRANSACTION')
    response.send({ message: 'Sucessfully added new workout', data: result })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.json({ message: 'Something went wrong', error })
  }
}
