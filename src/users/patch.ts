import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { User } from '../lib/types/user'
import { formatPatchBody } from '../utils/format-request-body'
import { saltAndHash } from '../utils/security'

export const updateUser = async (request: Request, response: Response): Promise<void> => {
  if (request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an id' })
    return
  }

  let data = request.body
  const columns: string[] = Object.keys(data)

  if (columns.includes('password')) {
    // Reset status if password is updated
    data = { ...request.body, password: await saltAndHash(request.body.password), status: 'active' }
  }

  const values: string[] = Object.values(data)

  const set = formatPatchBody(columns)
  const query = `
    UPDATE users
    SET ${set}
    WHERE id = ${request.params.id}
    `
  try {
    await client.query('BEGIN TRANSACTION')

    const res: QueryResult<User> = await client.query(query, [...values])

    await client.query('COMMIT TRANSACTION')
    response.status(201).send({ message: 'Successfully Updated user' })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
