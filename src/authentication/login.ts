import { Response, Request } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { User } from '../lib/types/user'
import { rollback } from '../utils/rollback'
import jwt from 'jsonwebtoken'

export const login = async (request: Request, response: Response): Promise<void> => {
  const query = `
  SELECT * FROM users
  WHERE email = $1
  AND password = $2;
  `

  try {
    await client.query('BEGIN TRANSACTION')
    const result: QueryResult<User> = await client.query(query, [request.body.username, request.body.password])

    if (!result.rowCount) {
      response.statusCode = 404
      response.send({ message: 'No users found with match details' })
    }

    // if the user is an admin, we want to send back admin related fields
    // if the user is a subscriber, we want to only send subscriber related fields

    // const filteredResponse =

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

    await client.query('COMMIT TRANSACTION')
    response.status(200).send({ message: 'Successfully logged in', user: { ...result.rows[0], token } })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).send({ message: 'Something went wrong', error })
  }
}
