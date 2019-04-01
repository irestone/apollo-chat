import Joi from 'joi'
import mongoose from 'mongoose'

const objectId = {
  name: 'string',
  base: Joi.string(),
  language: {
    objectId: 'must be a valid Object ID'
  },
  rules: [
    {
      name: 'objectId',
      validate (_, value, state, options) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return this.createError('string.objectId', {}, state, options)
        }
        return value
      }
    }
  ]
}

const JoiExtended = Joi.extend(objectId)

JoiExtended.validateSync = (value, schema) => {
  const result = Joi.validate(value, schema, { abortEarly: false })
  if (result.error) throw result.error
  return result.value
}

export default JoiExtended
