import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { router } from './src/routes'
// import { getUsers } from './server'
import { connectDb } from './server'

dotenv.config()

export const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

// app.get('/', (request: Request, response: Response): void => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })

// app.get('/users', getUsers)

app.listen(3030, (): void => {
  console.log(`App running on port 3030.`)
})

connectDb()
