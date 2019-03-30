import { AuthenticationError } from 'apollo-server-express'

import { User as users } from './models'
import { User as validate } from './validators'
import { session } from './config'

// /////////////////////////////////////////////////////////////////////////////
// PREDICATES

export const is = {}

is.signedIn = ({ req }) => !!req.session.userId

// /////////////////////////////////////////////////////////////////////////////
// CHECKS

export const check = {}

check.signedIn = (ctx) => {
  if (!is.signedIn(ctx)) {
    throw new AuthenticationError('You are not signed in.')
  }
}

check.signedOut = (ctx) => {
  if (is.signedIn(ctx)) {
    throw new AuthenticationError('You are signed in.')
  }
}

// /////////////////////////////////////////////////////////////////////////////
// ACTIONS

export const perform = {}

perform.signUp = async (ctx, args) => {
  check.signedOut(ctx)
  validate.mutation.signUp(args)
  const user = await users.create(args)
  ctx.req.session.userId = user.id
  return user
}

perform.signIn = async (ctx, args) => {
  check.signedOut(ctx)
  validate.mutation.signIn(args)
  const user = await users.findOne({ email: args.email })
  if (!user || !user.matchesPassword(args.password)) {
    throw new AuthenticationError('Incorrect email or password.')
  }
  ctx.req.session.userId = user.id
  return user
}

perform.signOut = (ctx) => {
  check.signedIn(ctx)
  return new Promise((resolve, reject) => {
    ctx.req.session.destroy((err) => {
      if (err) reject(err)
      ctx.res.clearCookie(session.name)
      resolve(true)
    })
  })
}
