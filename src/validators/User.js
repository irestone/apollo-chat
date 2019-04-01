import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'

const validate = {}

export default validate

// /////////////////////////////////////////////////////////////////////////////
// JOI HELPERS

const schema = (keys) => Joi.object().keys(keys)

const validator = (args, shema) => {
  const { error } = Joi.validate(args, shema, { abortEarly: false })
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

// Mutations inputs

validate.input = {}

validate.input.signUp = (args) =>
  validator(args, schema({ email, password, username, name }))

validate.input.signIn = (args) => validator(args, schema({ email, password }))

// Fields

validate.field = {}

validate.field.id = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new UserInputError(`'${id}' is not a valid user ID`)
  }
}
