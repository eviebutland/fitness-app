import { Request, Response } from 'express'
// import { pool } from '../../server'

export const createUser = async (request: Request, response: Response) => {
  const name = 'Evie'
  const email = 'evie.butland@gamol.com'

  // await pool.query(
  //   'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
  //   [name, email],
  //   (error, results) => {
  //     if (error) {
  //       console.log('theres an error', error)
  //       return
  //     }

  //     console.log(results)
  //     response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  //   }
  // )
}
