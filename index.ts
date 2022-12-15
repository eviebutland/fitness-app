import express, { Express } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { router } from './src/routes'
import { connectDb } from './server'
import OpenApiBackend from 'openapi-backend'
import { handlers } from './src/index'
import { document } from './schema/schema'
import type { Request } from 'openapi-backend'
import session from 'express-session'
import passport from './oauth2'

const api = new OpenApiBackend({
  definition: document,
  handlers
})

dotenv.config()

export const app: Express = express()
app.use(
  session({
    name: 'expressSessionHere',
    secret: 'something is in the seceet',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 100
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
// app.use(
//   passport.authenticate('oauth2Bearer', (error, done, next) => {
//     console.log('using bearer token to authorise', error)
//     // error prints null
//     // done prints false
//     // next prints Bearer realm="Users" ??
//     console.log(done)
//     console.log(next)
//   })
// )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)
app.use((req, res) => api.handleRequest(req as Request, req, res))

app.listen(3030, (): void => {
  console.log(`App running on port 3030.`)
})

connectDb()
