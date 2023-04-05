import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// TODO store these values in AWS
export const client: Client = new Client({
  user: process.env.RDS_USERNAME,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  password: process.env.RDS_PASSWORD,
  port: parseInt(process.env.RDS_PORT || '5432')
})

export const connectDb = async (): Promise<void> => {
  try {
    await client.connect()
  } catch (error) {
    throw new Error(`Error connecting to DB: ${error}`)
  }
}
