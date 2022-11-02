import { Response, Request } from 'express'
import { client } from '../../server'

export const getUsers = async (request: Request, response: Response) => {
  try {
    const res = await client.query('SELECT * FROM users')

    response.json({ data: res.rows, total: res.rows.length })
  } catch (error) {
    try {
      await client.query('ROLLBACK;')
      console.log(error)
    } catch (e) {
      console.log('could not rollback: ', e)
    }
  } finally {
    // Best practice to have a finally and end the session
    // await client.end()
  }
}
