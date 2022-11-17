import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { User } from '../lib/types/user'

export const updateUser = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.status(404)
    response.send({ message: 'Please provide an id' })
    return
  }

  const columns = Object.keys(request.body)

  const values = Object.values(request.body)

  const set: string[] = []
  columns.forEach((column, index) => {
    set.push(`${column} = $${index + 1}`)
  })

  const query = `
    UPDATE users
    SET ${set}
    WHERE id = ${request.params.id}
    `
  try {
    await client.query('BEGIN TRANSACTION')

    const res: QueryResult<User> = await client.query(query, [...values])
    console.log(res)

    await client.query('COMMIT TRANSACTION')
    response.status(201).send({ message: 'Successfully Updated user' })
  } catch (error) {
    rollback(client)
    console.log(error)
    response.status(500).json({ message: 'Something went wrong', error })
  }
}
