// import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import passport from 'passport'
import { client } from './server'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy, IVerifyOptions } from 'passport-http-bearer'
import jwt from 'jsonwebtoken'
// const google = new Strategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID ?? '',
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//     callbackURL: 'https://localhost:3030/oauth2/redirect/google',
//     scope: ['profile'],
//     state: true

//     // http://localhost:3030/oauth2/redirect/google
//   },
//   (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
//     console.log('running verify', accessToken, refreshToken, profile, cb)
//   }
// )

// passport.use(google)
type Callback = (error: any, user?: any, options?: string | IVerifyOptions | undefined) => void

passport.use(
  new LocalStrategy(async function verify(username, password, done) {
    try {
      const user = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [
        username,
        password
      ])

      if (!user.rows[0]) {
        return done(null, false, { message: 'Incorrect username or password.' })
      }

      return done(null, user.rows[0])
    } catch (error) {
      done(error)
    }
  })
)

passport.use(
  new BearerStrategy(async function verify(token, done) {
    // Change to use bearer
    if (!token) {
      return done('No Token', false, { message: 'Please provide a token', scope: 'none' })
    }
    try {
      const user = await client.query('SELECT * FROM users WHERE token = $1', [token])

      if (!user.rows[0] || !jwt.verify(token, 'secret')) {
        return done(null, false, { message: 'Incorrect token. Please login again', scope: 'none' })
      }

      return done(null, user.rows[0], { scope: user.rows[0]?.levelofaccess })
    } catch (error) {
      done(error)
    }
  })
)

export default passport
