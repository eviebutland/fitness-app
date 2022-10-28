import { Response, Request } from 'express'
import { QueryResult } from 'pg'
import { client } from '../../server'

export const getUsers = async (request: Request, response: Response) => {
  // response.send('Reached users')
  const res = await client.query('SELECT * FROM users')

  response.json(res.rows)
  await client.end()

  //
}
