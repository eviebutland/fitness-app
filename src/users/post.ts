import { Request, Response } from 'express'
import { client } from '../../server'

export const createUser = async (request: Request, response: Response) => {
  const firstName = 'Evie'
  const lastName = 'B'
  const email = 'evie.butland@gamol.com'

  // Insert into means adding a record to the table
  const query = `
INSERT INTO users (email, name)
VALUES ('johndoe@gmail.com', 'john')
`

  try {
    const res = await client.query(query)

    console.log(res)
    response.json(res.rows)
  } catch (error) {
    client.query('ROLLBACK;')
    console.log(error)
    response.json(error)
  } finally {
    // await client.end()
  }
}
