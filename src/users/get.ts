import { Response, Request } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'
import { composeObject, formatResponse } from '../utils/format-response'

export const getUsers = async (request: Request, response: Response) => {
  try {
    const res = await client.query('SELECT * FROM users')

    const data = formatResponse(res, 'workoutpreference')

    response.json({ data, total: res.rows.length })
  } catch (error) {
    rollback(client)
    // try {
    //   await client.query('ROLLBACK;')
    //   console.log(error)
    // } catch (e) {
    //   console.log('could not rollback: ', e)
    // }
  } finally {
    // Best practice to have a finally and end the session
    // await client.end()
  }
}

export const getAUser = async (request: Request, response: Response) => {
  if (request.params.id === ':id') {
    response.send({ message: 'Error: Please provide an ID' })
    return
  }

  const query = `SELECT * FROM users
  WHERE id = $1`

  try {
    const result = await client.query(query, [request.params.id])

    const data = formatResponse(result, 'workoutpreference')

    console.log(data)
    response.send(data)
  } catch (error) {
    rollback(client)
  } finally {
    // do something here
  }
}
