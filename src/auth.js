import { AuthenticationError } from 'apollo-server-express'
import { User as users } from './models'
import { session } from './config'

// /////////////////////////////////////////////////////////////////////////////
// ACTIONS

const signIn = async ({ email, password }) => {
  const user = await users.findOne({ email })
  if (!user || !user.matchesPassword(password)) {
    throw new AuthenticationError('Incorrect email or password.')
  }
  return user
}

const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err)
      res.clearCookie(session.name)
      resolve(true)
    })
  })

// /////////////////////////////////////////////////////////////////////////////
// CHECKS

const signedIn = (req) => {
  if (!isSignedIn(req)) {
    throw new AuthenticationError('You are not signed in.')
  }
}

const signedOut = (req) => {
  if (isSignedIn(req)) {
    throw new AuthenticationError('You are signed in.')
  }
}

// /////////////////////////////////////////////////////////////////////////////
// EXPORT

export const isSignedIn = (req) => !!req.session.userId

export const perform = { signIn, signOut }
export const check = { signedIn, signedOut }
