import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'

const User = {}

export default User

// /////////////////////////////////////////////////////////////////////////////
// JOI HELPERS

const schema = (keys) => Joi.object().keys(keys)

const validate = (values, shema) => {
  const { error } = Joi.validate(values, shema, { abortEarly: false })
  if (error) throw error
}

// /////////////////////////////////////////////////////////////////////////////
// JOI KEYS

const email = Joi.string()
  .label('Email')
  .required()
  .email()

const password = Joi.string()
  .label('Password')
  .required()
  .regex(/^(?=\S*[A-Za-z])(?=\S*\d)\S*$/)
  .min(5)
  .max(100)
  .options({
    language: {
      string: {
        regex: { base: 'must contain at least one letter and one digit' }
      }
    }
  })

const username = Joi.string()
  .label('Username')
  .required()
  .alphanum()
  .max(30)

const name = Joi.string()
  .label('Name')
  .required()
  .max(250)

// /////////////////////////////////////////////////////////////////////////////
// VALIDATORS

// Mutations (actions)

User.mutation = {}

User.mutation.signUp = (args) =>
  validate(args, schema({ email, password, username, name }))

User.mutation.signIn = (args) => validate(args, schema({ email, password }))

// Keys (fields)

User.key = {}

User.key.id = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`'${id}' is not a valid user ID`)
  }
}
