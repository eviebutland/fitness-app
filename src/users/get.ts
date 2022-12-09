import { Response, Request } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { formatResponse } from '../utils/format-response'
import { QueryResult } from 'pg'
import { User } from '../lib/types/user'

export const getUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')

    const res: QueryResult<User> = await client.query('SELECT * FROM users')

    const data: User[] = formatResponse(res, 'workoutpreference')

    await client.query('COMMIT TRANSACTION')
    response.json({ data, total: res.rows.length })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Error getting all users', error })
  }
}

export const getAUser = async (request: Request, response: Response): Promise<void> => {
  if (request.params.id === ':id') {
    response.status(404)
    response.send({ message: 'Error: Please provide an ID' })
    return
  }

  const query = `SELECT * FROM users
  WHERE id = $1`

  try {
    await client.query('BEGIN TRANSACTION')

    const result: QueryResult<User> = await client.query(query, [request.params.id])

    const data: User[] = formatResponse(result, 'workoutpreference')

    await client.query('COMMIT TRANSACTION')

    response.send({ data: data[0] })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error: error })
  }
}
