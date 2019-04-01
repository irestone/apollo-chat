import { model, Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const schema = new Schema(
  {
    title: String,
    users: [{ type: ObjectId, ref: 'User' }],
    lastMessage: { type: ObjectId, ref: 'Message' }
  },
  {
    timestamps: true
  }
)

export default model('Chat', schema)
