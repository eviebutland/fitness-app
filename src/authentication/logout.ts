import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'

export const logout = async (api: Context, request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an id' })
    return
  }
  try {
    await client.query('BEGIN TRANSACTION')
    // remove the token on the user request
    const query = `
    UPDATE users
    SET token = null
    WHERE id = ${request.params.id}
    `

    const result: QueryResult<User> = await client.query(query)

    await client.query('COMMIT TRANSACTION')

    response.status(200).json({ message: 'Sucessfully logged out' })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).send({ message: 'Something went wrong', error })
  }
}
