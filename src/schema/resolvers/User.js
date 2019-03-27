import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'

import { User as users } from '../models'
import { User as validate } from '../validators'

export default {
  Query: {
    users: () => {
      // todo: auth, projection, sanitization, pagination
      return users.find()
    },
    user: (_, { id }) => {
      // todo: auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`'${id}' is not a valid user ID`)
      }
      return users.findById(id)
    }
  },
  Mutation: {
    signUp: (_, args) => {
      // todo: no auth
      validate(args)
      return users.create(args)
    }
  }
}
