import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'

export default {
  Query: {
    users: () => {
      // todo: auth, projection, sanitization, pagination
      return User.find()
    },
    user: (_, { id }) => {
      // todo: auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`'${id}' is not a valid user ID`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (_, args) => {
      // todo: not auth, validation
      return User.create(args)
    }
  }
}
