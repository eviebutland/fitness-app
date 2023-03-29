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
import { login } from './src/authentication/index'
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
  // const createUserPath = request.method === 'POST' && request.url.includes('user')
  // const activationPath = request.method === 'PATCH' && request.url.includes('users')
  const loginPath = request.url.includes('login')
  const logoutPath = request.url.includes('logout')
  // const resetPasswordPath = request.url.includes('reset-password')

  loginPath || logoutPath ? next() : passport.authenticate('bearer', { session: false })(request, response, next)
})

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
  return res.status(400).json({ status: 400, err: c.validation.errors })
}

// // TODO use this instead of homemade authorization
// function unauthorizedHandler(c: Context, req: ParsedRequest, res: Response) {
//   return res.status(401).json({ status: 401, err: 'Please authenticate first' })
// }

// api.registerHandler('unauthorizedHandler', unauthorizedHandler)

api.init()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// API handle request will trigger handlers (and validation fail)
app.use((req, res) => api.handleRequest(req as OpenAPIRequest, req, res))

app.use(router)

app
  .listen(3030, () => {
    console.log(`App running on port 3030.`)
  })
  .on('error', error => {
    console.log(error)

    process.exit()
  })

connectDb()
