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
`;

module.exports = typeDefs;
