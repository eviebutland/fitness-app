import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { User } from '../lib/types/user'
import { formatPatchBody } from '../utils/format-request-body'
import { passwordValidation, saltAndHash } from '../utils/security'
import { Context } from 'openapi-backend'
import { ICourierClient, CourierClient } from '@trycourier/courier'

export const updateUser = async (api: Context, request: Request, response: Response): Promise<void> => {
  if (api.request.params.id === ':id') {
    response.status(404).json({ message: 'Please provide an id' })
    return
  }

  let data = api.request.body
  let columns: string[] = Object.keys(data)

  if (columns.includes('password')) {
    passwordValidation(api.request.body.password)

    // Reset status if password is updated
    data = { ...api.request.body, password: await saltAndHash(api.request.body.password), status: 'active' }
    columns = Object.keys(data)
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

export const createActivationCode = async (api: Context, request: Request, response: Response) => {
  if (!request.body.email) {
    response.status(404).json({ message: 'Error: Please provide an email' })
    return
  }

  const activationCode = Math.floor(Math.random() * 100000)
  console.log('RANDOM ACTIVATION CODE', activationCode)

  // Get the user first
  const query = `SELECT * FROM users
    WHERE email = $1`

  try {
    await client.query('BEGIN TRANSACTION')
    const user: QueryResult<User> = await client.query(query, [request.body.email])

    await client.query('COMMIT TRANSACTION')

    // Check the user exists before triggering email
    if (user.rows.length && user.rows[0]?.id) {
      const courier: ICourierClient = CourierClient({ authorizationToken: 'pk_prod_MJAHFWSKV24TJXQJAV7KHKC975SW' })

      await courier.send({
        message: {
          to: {
            email: request.body.email
          },
          template: 'HBDVP38QPSMS4YG676E20DGYP7X6',
          data: {
            activationCode
          }
        }
      })

      response
        .status(201)
        .json({ message: 'Successfully sent activation code', token: activationCode, id: user.rows[0].id })
    } else {
      response.status(400).json({ message: `Unable to find user with email ${request.body.email}` })
    }
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
