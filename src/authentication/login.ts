import { Response, Request } from 'express'
import { client } from '../../server'
import { rollback } from '../utils/rollback'

export const login = async (request: Request, response: Response) => {


  const query = `
  SELECT * FROM users
  WHERE email = $1
  AND password = $2;
  
  `

  try {
    await client.query('BEGIN TRANSACTION')
    const result = await client.query(query, [request.body.username, request.body.password])

    if (!result.rowCount) {
      response.statusCode = 404
      response.send({ message: 'No users found with match details' })
    }


    // if the user is an admin, we want to send back admin related fields
    // if the user is a subscriber, we want to only send subscriber related fields

    // const filteredResponse = 

    await client.query('COMMIT TRANSACTION')
    response.status(200).send({message: 'Successfully logged in', user: result.rows})


  } catch (error) {
    rollback(client)
  } 
}
