import { Response, Request } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../../server'

export const getUsers = (request: Request, response: Response): void => {
  // response.send('Reached users')

  pool.query('SELECT * FROM users', (error, results) => {
    console.log('RUNNING QUERY')
    if (error) {
      console.log('Error', error)
    }
    console.log(results)
  })

  //
}
