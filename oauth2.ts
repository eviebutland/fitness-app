// import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import passport from 'passport'
import { IVerifyOptions, Strategy } from 'passport-http-bearer'
import { client } from './server'
const BearerStrategy = Strategy
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

const findUser = async (token: string, done: Callback) => {
  const query = `
    SELECT * FROM users
    WHERE token = $1
    `
  try {
    console.log('running strategery')
    const user = await client.query(query, [token])
    console.log(user)
    if (!user.rows.length) {
      return done(null, false)
    }

    return done(null, user, { scope: 'all' })
  } catch (error) {
    return done(error)
  }
}

passport.use(
  'oauth2Bearer',
  new BearerStrategy(function (accessToken, done) {
    // jwt.verify(accessToken, config.secrets.session, (err, decoded) => {
    // if (err) {
    //   return done(null, false, err)
    // }

    // On future, scopes can ve taken from token.
    var info = {
      scope: '*'
    }
    console.log('running')
    done(null, true, info)
    // })
  })
)

export default passport
