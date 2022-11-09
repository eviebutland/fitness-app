import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

interface User {
  name: string
  age: number
  email: string
  password: string
  levelofaccess: string
  premium: string // could use a type here 'STANDARD' ..
  completedworkouts: string[]
  permissions: string
  workoutpreference: string
}

export const updateUser = async (request: Request, response: Response) => {
  const columns = Object.keys(request.body)

  const values = Object.values(request.body)

  const set: string[] = []
  columns.forEach((column, index) => {
    set.push(`${column} = $${index + 1}`)
  })

  const query = `
    UPDATE users
    SET ${set}
    WHERE id = ${request.params.id}
    `
  try {
    const res: QueryResult<User> = await client.query(query, [...values])
    console.log(res)
    response.json(res)
  } catch (error) {
    rollback(client)
  } finally {
    // do something here
  }
}
