import { model, Schema } from 'mongoose'
import { hash } from 'bcryptjs'

const schema = new Schema(
  {
    email: String,
    password: String,
    username: String,
    name: String
  },
  {
    timestamps: true
  }
)

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10)
    } catch (e) {
      next(e)
    }
  }
  next()
})

export default model('User', schema)
