import { model, Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const schema = new Schema(
  {
    body: String,
    sender: { type: ObjectId, ref: 'User' },
    chat: { type: ObjectId, ref: 'Chat' }
  },
  {
    timestamps: true
  }
)

export default model('Message', schema)
