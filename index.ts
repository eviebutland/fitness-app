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

const api = new OpenApiBackend({
  definition: document,
  // handlers, // Validation will be triggered once handlers are set up here
  handlers,
  validate: true,
  strict: true
})

function validationFailHandler(c: Context, req: ParsedRequest, res: Response) {
  console.log('running via validation fail', c)
  return res.status(400).json({ status: 400, err: c.validation.errors })
}

api.register('validationFail', validationFailHandler)

api.init()

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

app.use((c: Context, req: Request, res: Response, next: NextFunction) =>
  api.handleRequest(req as OpenAPIRequest, req, res, next, c)
)

app.listen(3030, (): void => {
  console.log(`App running on port 3030.`)
})

connectDb()
