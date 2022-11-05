import { Request, Response } from 'express'
import { client } from '../../server'

export const createUser = async (request: Request, response: Response) => {
  const query = `
INSERT INTO users (name, age, email, password, levelOfAccess, premium, completedWorkouts, permissions, workoutPreference)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`
  // Workout preferences mising - no type for object

  try {
    const res = await client.query(query, [Object.values(request.body)])

    console.log(res)
    response.json(res.rows)
  } catch (error) {
    client.query('ROLLBACK;')
    console.log('ROLLBACK', error)
    response.json(error)
  } finally {
    // await client.end()
  }
}
