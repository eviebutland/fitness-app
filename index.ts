import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { router } from './src/routes'
import { connectDb } from './server'
import OpenApiBackend, { Context, ParsedRequest } from 'openapi-backend'
import { handlers } from './src/index'
import { document } from './schema/schema'
import type { Request as OpenAPIRequest } from 'openapi-backend'
import session from 'express-session'
import passport from './oauth2'

dotenv.config()

export const app: Express = express()

app.use(
  session({
    name: 'expressSessionHere',
    secret: 'something is in the secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 100
    }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use((request: Request, response: Response, next: NextFunction) => {
  request.url.includes('login') || request.url.includes('logout')
    ? next()
    : passport.authenticate('bearer', { session: false })(request, response, next)
})

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

const api = new OpenApiBackend({
  definition: document,
  handlers: {
    ...handlers,
    validationFail: validationFailHandler
  },
  validate: true,
  strict: true
})

async function validationFailHandler(c: Context, req: ParsedRequest, res: Response) {
  console.log('running via validation fail', c.request.path)

  console.log(res)
  return res.status(400).json({ status: 400, err: c.validation.errors })
}

// TODO use this instead of homemade authorization
// function unauthorizedHandler(c, req, res) {
//   return res.status(401).json({ status: 401, err: 'Please authenticate first' })
// }

// api.registerHandler('validationFail', validationFailHandler)
// api.registerHandler('unauthorizedHandler', unauthorizedHandler)

api.init()

app.use((c: Context, req: Request, res: Response) => api.handleRequest(req as OpenAPIRequest, res))

app.listen(3030, (): void => {
  console.log(`App running on port 3030.`)
})

connectDb()
