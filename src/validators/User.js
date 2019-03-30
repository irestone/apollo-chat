import Joi from 'joi'

const schema = (keys) => Joi.object().keys(keys)

const validate = (values, shema) => {
  const { error } = Joi.validate(values, shema, { abortEarly: false })
  if (error) throw error
}

// /////////////////////////////////////////////////////////////////////////////
// VALUES

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

const signUp = (values) =>
  validate(values, schema({ email, password, username, name }))

const signIn = (values) => validate(values, schema({ email, password }))

export default { signUp, signIn }
