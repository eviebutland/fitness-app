import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { router } from './src/routes'
// import { getUsers } from './server'

dotenv.config()
const port = process.env.PORT

export const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.get('/', (request: Request, response: Response): void => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// app.get('/users', getUsers)

app.listen(port, (): void => {
  console.log(`App running on port ${port}.`)
})
