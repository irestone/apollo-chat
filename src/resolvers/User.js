import { User as users } from '../models'
import { User as validate } from '../validators'
import auth from '../auth'

const User = {}

export default User

// /////////////////////////////////////////////////////////////////////////////
// QUERIES

User.Query = {}

// todo projection
User.Query.me = (_, __, { req }) => users.findById(req.session.userId)

// todo projection, sanitization, pagination
User.Query.users = (_, __, ctx) => users.find()

// todo projection, sanitization
User.Query.user = (_, { id }) => {
  validate.field.id(id)
  return users.findById(id)
}

// /////////////////////////////////////////////////////////////////////////////
// MUTATIONS

User.Mutation = {}

User.Mutation.signUp = (_, args, ctx) => auth.perform.signUp(ctx, args)
User.Mutation.signIn = (_, args, ctx) => auth.perform.signIn(ctx, args)
User.Mutation.signOut = (_, __, ctx) => auth.perform.signOut(ctx)
