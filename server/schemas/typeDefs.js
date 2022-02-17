const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type bookSchema {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [bookSchema]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser(_id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    saveBook(_id: ID!, savedBooks: bookSchema): User
    deleteBook(_id: ID!, savedBooks: bookSchema): User
  }
`;

module.exports = typeDefs;
