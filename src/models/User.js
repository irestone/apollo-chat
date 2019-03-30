import { model, Schema } from 'mongoose'
import { hash, compareSync } from 'bcryptjs'

const schema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (email) => User.doesntExist({ email }),
        // todo security
        message: () => `The user with this email address already exists.`
      }
    },
    username: {
      type: String,
      validate: {
        validator: (username) => User.doesntExist({ username }),
        // todo security
        message: () => `The user with this username already exists.`
      }
    },
    password: String,
    name: String
  },
  {
    timestamps: true
  }
)

schema.statics.doesntExist = async function (params) {
  return !(await this.findOne(params))
}

schema.methods.matchesPassword = function (password) {
  return compareSync(password, this.password)
}

schema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

const User = model('User', schema)

export default User
