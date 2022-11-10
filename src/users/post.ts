import { Request, Response } from 'express'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'

export const createUser = async (request: Request, response: Response) => {
  const query = `
INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`

  let model: User = request.body
  model = {
    ...request.body,
    workoutPreference: JSON.stringify(request.body.workoutPreference)
  }

  try {
    const res = await client.query(query, [...Object.values(model)])

    response.json(res.rows)
  } catch (error) {
    rollback(client)
  } finally {
    // await client.end()
  }
}
