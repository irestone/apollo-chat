import { User as users, Chat as chats, Message as messages } from '../models'
import { Chat as validate } from '../validators'
import { UserInputError } from 'apollo-server-express'

const Resolver = {
  Chat: {},
  Mutation: {}
}

export default Resolver

// /////////////////////////////////////////////////////////////////////////////
// FIELDS

Resolver.Chat.users = async (parent) => {
  const chat = await parent.populate('users').execPopulate()
  return chat.users
}

// todo projection, pagination
Resolver.Chat.messages = ({ id }) => messages.find({ chat: id })

Resolver.Chat.lastMessage = async (parent) => {
  const chat = await parent.populate('lastMessage').execPopulate()
  return chat.lastMessage
}

// /////////////////////////////////////////////////////////////////////////////
// MUTATIONS

// ? Do I need to ensure that users own id is not in args.userIds?
Resolver.Mutation.startChat = async (_, args, ctx) => {
  validate.input.startChat(args)

  const { title = 'Untitled', userIds } = args

  const idsFound = await users
    .where('_id')
    .in(userIds)
    .countDocuments()

  if (idsFound !== userIds.length) {
    throw new UserInputError('One or more IDs are invalid.')
  }

  const { userId } = ctx.req.session
  if (!userIds.includes(userId)) userIds.push(userId)

  const chat = await chats.create({ title, users: userIds })
  await users.updateMany({ _id: { $in: userIds } }, { $push: { chats: chat } })

  return chat
}
