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
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      username: String!
      name: String
    ): User
  }
`
