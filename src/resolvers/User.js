import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'

import { User as users } from '../models'
import { User as validate } from '../validators'
import * as auth from '../auth'

export default {
  Query: {
    me: (_, __, { req }) => {
      // todo projection
      auth.check.signedIn(req)
      return users.findById(req.session.userId)
    },
    users: (_, __, { req }) => {
      // todo projection, sanitization, pagination
      auth.check.signedIn(req)
      return users.find()
    },
    user: (_, { id }, { req }) => {
      // todo projection, sanitization
      auth.check.signedIn(req)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`'${id}' is not a valid user ID`)
      }
      return users.findById(id)
    }
  },
  Mutation: {
    signUp: async (_, args, { req }) => {
      auth.check.signedOut(req)
      validate.signUp(args)
      const user = await users.create(args)
      req.session.userId = user.id
      return user
    },
    signIn: async (_, args, { req }) => {
      if (auth.isSignedIn(req)) {
        return users.findById(req.session.userId)
      }
      validate.signIn(args)
      const user = await auth.perform.signIn(args)
      req.session.userId = user.id
      return user
    },
    signOut: async (_, __, { req, res }) => {
      auth.check.signedIn(req)
      await auth.perform.signOut(req, res)
      return true
    }
  }
}
