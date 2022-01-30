const { gql } = require("apollo-server-express");

//TODO: Look up how to handle arrays in gql for authors
//Need to figure out how to make username and email unique
//Need to figure out how to validate email
const typeDefs = gql`
  type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Query {
    getSingleUser(_id: ID!): User
  }

  type Mutation {
    createUser(
        username: String!
        email: String!
        password: String!
    ): User
    login(): User
    saveBook(
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    ): Book
    deleteBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
