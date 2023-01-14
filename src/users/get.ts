import { Response, Request } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { formatResponse } from '../utils/format-response'
import { QueryResult } from 'pg'
import { User } from '../lib/types/user'
import { Context } from 'openapi-backend'

export const getUsers = async (api: Context, request: Request, response: Response): Promise<void> => {
  try {
    await client.query('BEGIN TRANSACTION')

    const res: QueryResult<User> = await client.query(
      'SELECT id, name, email, age, password, levelofaccess, premium, completedworkouts, permissions, workoutpreference FROM users'
    )

    const data: User[] = formatResponse(res, ['workoutpreference'])

    await client.query('COMMIT TRANSACTION')
    response.json({ data, total: res.rows.length })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Error getting all users', error })
  }
}

export const getAUser = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(404).json({ message: 'Error: Please provide an ID' })
    return
  }

  const query = `SELECT * FROM users
  WHERE id = $1`

  try {
    await client.query('BEGIN TRANSACTION')

    const result: QueryResult<User> = await client.query(query, [api.request.params.id])

    const data: User[] = formatResponse(result, ['workoutpreference', 'completedworkouts', 'permissions'])

    await client.query('COMMIT TRANSACTION')

    response.status(200).json({ data: data[0] })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error: error })
  }
}
