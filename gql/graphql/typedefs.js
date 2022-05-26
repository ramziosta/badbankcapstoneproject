const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Account {
    username: String!
    email: String!
    accountNumber: Int!
    accountType: String!
    createdAt: String!
    balance: Int!
    transactions: [Transaction]
  }

  type Transaction {
    accountNumber: Int!
    accountType: String!
    transactionAmount: Int!
    transactionType: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    accountType: String!
    account: Account!
  }

  type UserEdit {
    email: String!
    username: String!
    password: String!
  }


  input TransactionInput {
    accountType: String!
    accountNumber: String!
    transactionAmount: String!
    transactionType: String!
  }

  input AccountInput {
    username: String!
    email: String!
    accountNumber: String!
    accountType: String!
    createdAt: String!
    balance: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    accountType: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
    getAccounts: [Account]
    getAccount(accountNumber: Int!): Account
    getTransactions: [Transaction]
    getTransaction(accountNumber: Int!): Transaction
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    transaction(transactionInput: TransactionInput): Transaction!

  }
`;
