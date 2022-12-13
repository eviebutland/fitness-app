import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import passport from 'passport'

const google = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: 'https://localhost:3030/oauth2/redirect/google',
    scope: ['profile'],
    state: true

    // http://localhost:3030/oauth2/redirect/google
  },
  (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
    console.log('running verify', accessToken, refreshToken, profile, cb)
  }
)

passport.use(google)

export default passport
