import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'

export const createUser = async (request: Request, response: Response): Promise<void> => {
  const query = `
  INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  ON CONFLICT (id) DO NOTHING 
  `

  let model: User = request.body
  model = {
    ...request.body,
    workoutPreference: JSON.stringify(request.body.workoutPreference)
  }

  try {
    await client.query('BEGIN TRANSACTION')

    const res: QueryResult<User> = await client.query(query, [...Object.values(model)])

    await client.query('COMMIT TRANSACTION')
    response.json({ data: res.rows, message: 'Sucessfully inserted new user' })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
