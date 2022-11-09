import { Response, Request } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { formatResponse } from '../utils/format-response'
import { QueryResult } from 'pg'
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

export const getUsers = async (request: Request, response: Response) => {
  try {
    const res: QueryResult<User> = await client.query('SELECT * FROM users')

    const data: User[] = formatResponse(res, 'workoutpreference')

    response.json({ data, total: res.rows.length })
  } catch (error) {
    rollback(client)
  } finally {
    // Best practice to have a finally and end the session
    // await client.end()
  }
}

export const getAUser = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.send({ message: 'Error: Please provide an ID' })
    return
  }

  const query = `SELECT * FROM users
  WHERE id = $1`

  try {
    const result: QueryResult<User> = await client.query(query, [request.params.id])

    const data: User[] = formatResponse(result, 'workoutpreference')

    response.send({ data: data[0] })
  } catch (error) {
    rollback(client)
  } finally {
    // do something here
  }
}
