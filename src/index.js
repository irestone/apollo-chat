import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import { typeDefs, resolvers } from './schema'
import { port, inProduction, db } from './config'
;(async () => {
  try {
    await mongoose.connect(
      `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`,
      { useNewUrlParser: true }
    )

    const app = new Express()

    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !inProduction
    })

    apollo.applyMiddleware({ app })

    app.listen({ port }, () =>
      console.log(
        `Server: http://localhost:${port} GraphQL: http://localhost:${port}${
          apollo.graphqlPath
        }`
      )
    )
  } catch (e) {
    console.error(e)
  }
})()
