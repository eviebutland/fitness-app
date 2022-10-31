import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432
})

export const connectDb = async () => {
  try {
    await client.connect()
  } catch (error) {
    console.log(error)
  }
}
