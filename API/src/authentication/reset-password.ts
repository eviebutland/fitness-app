import { Request, Response } from 'express'
import { Context } from 'openapi-backend'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'
import { passwordValidation, saltAndHash } from '../utils/security'

export const resetPassword = async (api: Context, request: Request, response: Response) => {
  try {
    // Get hold of user by email
    const query = `SELECT * FROM users
    WHERE email = $1
    `

    await client.query('BEGIN TRANSACTION')
    const existingUser: QueryResult<User> = await client.query(query, [api.request.body.email])

    // Reset the password
    const updateQuery = `
    UPDATE users
    SET password = $1, status = $2
    WHERE id = ${existingUser.rows[0].id}
    `

    passwordValidation(api.request.body.newPassword)

    const password = await saltAndHash(api.request.body.newPassword)

    const updatedUser: QueryResult<User> = await client.query(updateQuery, [password, 'active'])

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ message: 'Successfully updated password' })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
