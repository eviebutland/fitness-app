import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const client: Client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432
})

export const connectDb = async (): Promise<void> => {
  try {
    await client.connect()
  } catch (error) {
    throw new Error(`Error connecting to DB: ${error}`)
  }
}
