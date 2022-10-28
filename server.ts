// import { Request, Response } from 'express'
import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const connectDb = async () => {
  try {
    const client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: 5432
    })

    await client.connect()
    const res = await client.query('SELECT * FROM users')
    console.log(res.rows)
    await client.end()
  } catch (error) {
    console.log(error)
  }
}

connectDb()

// pool.on('error', (err: Error) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// })
