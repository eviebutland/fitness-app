import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'
import { passwordValidation, saltAndHash } from '../utils/security'

export const createUser = async (api: Context, request: Request, response: Response): Promise<void> => {
  const query = `
  INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference, token, status)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, '', 'active')
  ON CONFLICT (id) DO NOTHING 
  `

  let model: User = api.request.body

  passwordValidation(api.request.body.password, response, client)

  model = {
    ...api.request.body,
    password: await saltAndHash(api.request.body.password),
    workoutPreference: JSON.stringify(api.request.body.workoutPreference)
  }

  try {
    await client.query('BEGIN TRANSACTION')

    const res: QueryResult<User> = await client.query(query, [...Object.values(model)])

    await client.query('COMMIT TRANSACTION')

    response.json({ message: 'Successfully inserted new user' })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
