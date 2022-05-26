const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const transactionsResolvers = require('./transactions');
const accountResolvers = require('./accounts')

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...transactionsResolvers.Query,
    ...accountResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...transactionsResolvers.Mutation,
    ...accountResolvers.Mutation,
    ...postsResolvers.Mutation
  }

};