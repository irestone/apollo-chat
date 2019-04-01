import { User as users } from '../models'
import { User as validate } from '../validators'
import auth from '../auth'

const Resolver = {
  User: {},
  Query: {},
  Mutation: {}
}

export default Resolver

// /////////////////////////////////////////////////////////////////////////////
// FIELDS

Resolver.User.chats = async (parent) => {
  const user = await parent.populate('chats').execPopulate()
  return user.chats
}

// /////////////////////////////////////////////////////////////////////////////
// QUERIES

// todo projection

Resolver.Query.me = (_, __, { req }) => users.findById(req.session.userId)

// todo  pagination
Resolver.Query.users = (_, __, ctx) => users.find()

Resolver.Query.user = (_, { id }) => {
  validate.field.id(id)
  return users.findById(id)
}

// /////////////////////////////////////////////////////////////////////////////
// MUTATIONS

Resolver.Mutation.signUp = (_, args, ctx) => auth.perform.signUp(ctx, args)
Resolver.Mutation.signIn = (_, args, ctx) => auth.perform.signIn(ctx, args)
Resolver.Mutation.signOut = (_, __, ctx) => auth.perform.signOut(ctx)
