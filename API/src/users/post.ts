import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User, UserRequestBody } from '../lib/types/user'
import { rollback } from '../utils/rollback'
import { passwordValidation, saltAndHash } from '../utils/security'
import jwt from 'jsonwebtoken'

export const createUser = async (api: Context, request: Request, response: Response): Promise<void> => {
  const activationToken = jwt.sign(
    {
      email: request.body.email,
      password: request.body.password
    },
    'secret'
  )

  const formatRequest = {
    name: request.body.name,
    age: request.body.age,
    email: request.body.email,
    password: await saltAndHash(api.request.body.password),
    levelOfAccess: request.body.levelOfAccess,
    premium: request.body.premium,
    completedWorkouts: JSON.stringify(request.body.completedWorkouts),
    permissions: request.body.permissions,
    workoutPreference: JSON.stringify(api.request.body.workoutPreference),
    token: activationToken ?? '',
    status: request.body.status
  }

  const insertQuery = `
  INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference, token, status)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  ON CONFLICT (id) DO NOTHING 
  `

  let model: UserRequestBody = formatRequest

  try {
    await client.query('BEGIN TRANSACTION')

    const existingUserResult = await client.query(
      `
    SELECT email FROM users
    WHERE email = $1
    `,
      [api.request.body.email]
    )

    if (existingUserResult.rowCount === 0) {
      if (passwordValidation(api.request.body.password).error) {
        response.status(400).json({ message: passwordValidation(api.request.body.password)?.message })
        return
      }

      console.log('activation tokne', activationToken)

      const res: QueryResult<User> = await client.query(insertQuery, [...Object.values(model)])
      response.json({ message: 'Successfully inserted new user', token: activationToken })
    } else {
      response.json({ message: 'This user already exists, please try with different details' })
    }

    await client.query('COMMIT TRANSACTION')
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
