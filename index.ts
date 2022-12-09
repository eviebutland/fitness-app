import express, { Express } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { router } from './src/routes'
import { connectDb } from './server'
import OpenApiBackend from 'openapi-backend'
import { handlers } from './src/index'
import { document } from './schema/schema'
import type { Request } from 'openapi-backend'

const api = new OpenApiBackend({
  definition: document,
  handlers
})

dotenv.config()

export const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.use((req, res) => api.handleRequest(req as Request, req, res))

app.listen(3030, (): void => {
  console.log(`App running on port 3030.`)
})

connectDb()
