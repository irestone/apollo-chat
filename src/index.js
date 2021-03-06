import Express from 'express'
import expressSession from 'express-session'
import connectRedis from 'connect-redis'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'

import typeDefs from './types'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import { port, inProduction, db, session, redis } from './config'

const run = async () => {
  try {
    // CONNECTING TO DATABASES

    await mongoose.connect(
      `mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`,
      { useNewUrlParser: true }
    )

    const Redis = connectRedis(expressSession)
    session.store = new Redis({ ...redis })

    // INITIALIZING

    const app = new Express()

    app.use(
      expressSession({
        store: session.store,
        name: session.name,
        secret: session.secret,
        saveUninitialized: false,
        resave: true,
        rolling: true,
        cookie: {
          sameSite: true,
          secure: inProduction,
          maxAge: session.lifetime
        }
      })
    )

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // CREATING APOLLO (GRAPHQL) SERVER

    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: !inProduction && {
        settings: { 'request.credentials': 'include' }
      },
      context: ({ req, res }) => ({ req, res })
    })

    apollo.applyMiddleware({ app, cors: false })

    // STARTING UP

    app.listen({ port }, () =>
      console.log(`
        Server  http://localhost:${port}
        GraphQL http://localhost:${port}${apollo.graphqlPath}
      `)
    )
  } catch (e) {
    console.error(e)
  }
}

run()
