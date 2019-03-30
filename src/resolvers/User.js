import { User as users } from '../models'
import { User as validate } from '../validators'
import * as auth from '../auth'

const User = {}

export default User

// /////////////////////////////////////////////////////////////////////////////
// QUERIES

User.Query = {}

// todo projection
User.Query.me = (_, __, ctx) => {
  auth.check.signedIn(ctx)
  return users.findById(ctx.req.session.userId)
}

// todo projection, sanitization
User.Query.user = (_, { id }, ctx) => {
  auth.check.signedIn(ctx)
  validate.key.id(id)
  return users.findById(id)
}

// todo projection, sanitization, pagination
User.Query.users = (_, __, ctx) => {
  auth.check.signedIn(ctx)
  return users.find()
}

// /////////////////////////////////////////////////////////////////////////////
// MUTATIONS

User.Mutation = {}

User.Mutation.signUp = (_, args, ctx) => auth.perform.signUp(ctx, args)
User.Mutation.signIn = (_, args, ctx) => auth.perform.signIn(ctx, args)
User.Mutation.signOut = (_, __, ctx) => auth.perform.signOut(ctx)
