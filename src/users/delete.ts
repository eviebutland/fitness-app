import { Request, Response } from 'express'
import { client } from '../../server'

export const deleteUser = async (request: Request, response: Response) => {
  // this command will delete all that match
  const query = `
    DELETE FROM users
    WHERE email = 'johndoe@gmail.com'
    `
  try {
    const res = await client.query(query)
    console.log(res)
    response.json('Delete successful')
  } catch (error) {
    console.log('Query failed')
    await client.query('ROLLBACK;')
  } finally {
    // do someting here
  }
}
