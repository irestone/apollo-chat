import { AuthenticationError } from 'apollo-server-express'

import { User as users } from './models'
import { User as validate } from './validators'
import { session } from './config'

const auth = {}

export default auth

// /////////////////////////////////////////////////////////////////////////////
// PREDICATES

auth.is = {}

auth.is.signedIn = ({ req }) => !!req.session.userId

// /////////////////////////////////////////////////////////////////////////////
// CHECKS

auth.ensure = {}

auth.ensure.signedIn = (ctx) => {
  if (!auth.is.signedIn(ctx)) {
    throw new AuthenticationError('You are not signed in.')
  }
}

auth.ensure.signedOut = (ctx) => {
  if (auth.is.signedIn(ctx)) {
    throw new AuthenticationError('You are signed in.')
  }
}

// /////////////////////////////////////////////////////////////////////////////
// ACTIONS

auth.perform = {}

auth.perform.signUp = async (ctx, args) => {
  validate.input.signUp(args)
  const user = await users.create(args)
  ctx.req.session.userId = user.id
  return user
}

auth.perform.signIn = async (ctx, args) => {
  validate.input.signIn(args)
  const user = await users.findOne({ email: args.email })
  if (!user || !user.matchesPassword(args.password)) {
    throw new AuthenticationError('Incorrect email or password.')
  }
  ctx.req.session.userId = user.id
  return user
}

auth.perform.signOut = (ctx) => {
  return new Promise((resolve, reject) => {
    ctx.req.session.destroy((err) => {
      if (err) reject(err)
      ctx.res.clearCookie(session.name)
      resolve(true)
    })
  })
}
