import { Request, Response } from 'express'
import { client } from '../../server'

export const updateUser = async (request: Request, response: Response) => {
  const query = `
    UPDATE users
    SET name = 'evie'
    WHERE email = 'johndoe@gmail.com'
    `
  try {
    const res = await client.query(query)
    response.json(res)
  } catch (error) {
    await client.query('ROLLBACK;')
  } finally {
    // do something here
  }
}
