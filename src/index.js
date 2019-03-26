import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'
import { port, env } from './config'

const app = new Express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: env !== 'production'
})

server.applyMiddleware({ app })

app.listen({ port }, () =>
  console.log(
    `Server: http://localhost:${port} GraphQL: http://localhost:${port}${
      server.graphqlPath
    }`
  )
)
