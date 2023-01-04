import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'
import { saltAndHash } from '../utils/security'

export const resetPassword = async (request: Request, response: Response) => {
  try {
    // Get hold of user by email
    const query = `SELECT * FROM users
    WHERE email = $1
    `

    await client.query('BEGIN TRANSACTION')
    const existingUser: QueryResult<User> = await client.query(query, [request.body.email])

    // Reset the password
    const updateQuery = `
    UPDATE users
    SET password = $1, status = $2
    WHERE id = ${existingUser.rows[0].id}
    `

    const passwordRegex = /([A-Z]+)([a-z]{3,})([!@£$%^&*()_+]+)([0-9])+/

    if (!passwordRegex.test(request.body.newPassword)) {
      await client.query('COMMIT TRANSACTION')
      response.status(400).json({
        message:
          'Password must require at least 1 uppercase, 3 or more lower case, 1 special character and at least 1 number '
      })

      return
    }

    const password = await saltAndHash(request.body.newPassword)

    const updatedUser: QueryResult<User> = await client.query(updateQuery, [password, 'active'])

    await client.query('COMMIT TRANSACTION')
    response.status(200).json({ message: 'Successfully updated password' })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
