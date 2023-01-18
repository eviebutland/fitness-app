import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { User } from '../lib/types/user'
import { formatPatchBody } from '../utils/format-request-body'
import { passwordValidation, saltAndHash } from '../utils/security'
import { Context } from 'openapi-backend'

export const updateUser = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an id' })
    return
  }

  let data = api.request.body
  const columns: string[] = Object.keys(data)

  if (columns.includes('password')) {
    passwordValidation(api.request.body.password, response, client)

    // Reset status if password is updated
    data = { ...api.request.body, password: await saltAndHash(api.request.body.password), status: 'active' }
  }

  const values: string[] = Object.values(data)

  const set = formatPatchBody(columns)
  const query = `
    UPDATE users
    SET ${set}
    WHERE id = ${api.request.params.id}
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
