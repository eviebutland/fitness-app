import { Response, Request } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

let failedLoginAttempts = 0
export const login = async (api: unknown, request: Request, response: Response): Promise<void> => {
  const query = `
  SELECT * FROM users
  WHERE email = $1
  `

  try {
    await client.query('BEGIN TRANSACTION')
    const result: QueryResult<User> = await client.query(query, [request.body.username])

    if (result.rows[0]?.status === 'inactive') {
      await client.query('COMMIT TRANSACTION')

      response.status(401).send({ message: 'Your account is locked out, please reset your password' })
      return
    }

    if (failedLoginAttempts >= 3) {
      // Update the status to show as locked out
      const updateQuery = `
      UPDATE users
      SET status = 'inactive'
      WHERE id = ${result.rows[0].id}
      `
      const updateResult: QueryResult<User> = await client.query(updateQuery)
      await client.query('COMMIT TRANSACTION')
      response
        .status(401)
        .send({ message: 'You have been locked out, please reset your password', failedLoginAttempts })

      failedLoginAttempts = 0
      return
    }

    const comparePassword = await bcrypt.compare(request.body.password, result.rows[0]?.password)

    if (!result.rowCount) {
      response.status(404).send({ message: 'No users found with match details' })
    }

    if (!comparePassword) {
      failedLoginAttempts++
      response
        .status(404)
        .send({ message: 'Details are incorrect, please check email and password', failedLoginAttempts })
      return
    }

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
            if (result.rows[0].levelofaccess === 'admin') {
              return (
                key !== 'password' &&
                key !== 'workoutpreference' &&
                key !== 'premium' &&
                key !== 'completedworkouts'
              )
            } else {
              return key !== 'password'
            }
          })
        ),
        token
      }
    })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).send({ message: 'Something went wrong', error })
  }
}
