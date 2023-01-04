import { Response, Request } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

let failedLoginAttempts = 0
export const login = async (request: Request, response: Response): Promise<void> => {
  const query = `
  SELECT * FROM users
  WHERE email = $1
  `
  if (failedLoginAttempts >= 3) {
    response.send({ message: 'You have been locked out, please reset your password', failedLoginAttempts })
    return
  }

  try {
    await client.query('BEGIN TRANSACTION')
    const result: QueryResult<User> = await client.query(query, [request.body.username])

    const comparePassword = await bcrypt.compare(request.body.password, result.rows[0]?.password)

    if (!result.rowCount) {
      response.statusCode = 404
      response.send({ message: 'No users found with match details' })
    }

    // if the user is an admin, we want to send back admin related fields
    // if the user is a subscriber, we want to only send subscriber related fields

    if (!comparePassword) {
      response.statusCode = 404
      failedLoginAttempts++
      response.send({ message: 'Details are incorrect, please check email and password', failedLoginAttempts })
      return
    }

    if (result.rows[0].id) {
      const token = jwt.sign(
        {
          id: result.rows[0].id,
          email: result.rows[0].email
        },
        'secret',
        { expiresIn: '1h' }
      )

      const updateQuery = `
      UPDATE users
      SET token = '${token}'
      WHERE id = ${result.rows[0].id}
      `

      const updateResult: QueryResult<User> = await client.query(updateQuery)
      failedLoginAttempts = 0
      await client.query('COMMIT TRANSACTION')
      response.status(200).send({
        message: 'Successfully logged in',
        user: {
          ...Object.fromEntries(
            Object.entries(result.rows[0]).filter(([key, value]) => {
              // Omit password from being returned to the user
              return key !== 'password'
            })
          ),
          token
        }
      })
    }
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).send({ message: 'Something went wrong', error })
  }
}
