import Joi from './joi'

const validate = {
  input: {},
  field: {}
}

export default validate

// /////////////////////////////////////////////////////////////////////////////
// SCHEMAS

const id = Joi.string()
  .label('User ID')
  .objectId()

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

// Inputs

validate.input.signUp = (value) =>
  Joi.validateSync(value, { email, password, username, name })

validate.input.signIn = (value) => Joi.validateSync(value, { email, password })

// Fields

validate.field.id = (value) => Joi.validateSync(value, id)
