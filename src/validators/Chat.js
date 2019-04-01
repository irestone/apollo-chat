import Joi from './joi'

const validate = {
  input: {}
}

export default validate

// /////////////////////////////////////////////////////////////////////////////
// SCHEMAS

const title = Joi.string()
  .label('Title')
  .min(1)
  .max(100)

const userIds = Joi.array()
  .label('User IDs')
  .min(1)
  .max(100)
  .unique()
  .items(
    Joi.string()
      .label('User ID')
      .objectId()
  )

// /////////////////////////////////////////////////////////////////////////////
// VALIDATORS

validate.input.startChat = (value) =>
  Joi.validateSync(value, { title, userIds })
