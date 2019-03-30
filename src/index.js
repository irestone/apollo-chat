import Express from 'express'
import expressSession from 'express-session'
import connectRedis from 'connect-redis'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'

import typeDefs from './types'
import resolvers from './resolvers'
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

    // INITIALIZIN APP

    const app = new Express()

    app.use(
      expressSession({
        store: session.store,
        name: session.name,
        secret: session.secret,
        resave: false,
        saveUninitialized: false,
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
      playground: !inProduction && {
        settings: { 'request.credentials': 'include' }
      },
      context: ({ req, res }) => ({ req, res }),
      cors: false
    })

    apollo.applyMiddleware({ app })

    // STARTING UP THE APP

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
