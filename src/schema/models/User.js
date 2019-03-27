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

schema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

export default model('User', schema)
