import { Request, Response } from 'express'
import pg from 'pg'

const Pool = pg.Pool

console.log('reached server file')
export const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password', // move to a .env file
  port: 3030
})

// export const getUsers = (request: Request, response: Response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     console.log(results)
//     // response.status(200).json(results.rows)
//   })
// }

// pool.connect((err, client: pg.PoolClient, done) => {
//   console.log(client)
// })

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
