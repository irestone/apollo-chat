import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    createdAt: String!
  }

  extend type Query {
    me: User @user
    user(id: ID!): User @user
    users: [User!]! @user
  }

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      username: String!
      name: String!
    ): User @guest
    signIn(email: String!, password: String!): User @guest
    signOut: Boolean! @user
  }
`
