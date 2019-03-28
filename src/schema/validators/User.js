import Joi from 'joi'

const schema = Joi.object().keys({
  email: Joi.string()
    .label('Email')
    .required()
    .email(),
  password: Joi.string()
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
    }),
  username: Joi.string()
    .label('Username')
    .required()
    .alphanum()
    .max(30),
  name: Joi.string()
    .label('Name')
    .required()
    .max(250)
})

export default (value) => {
  const { error } = Joi.validate(value, schema, { abortEarly: false })
  if (error) throw error
}
