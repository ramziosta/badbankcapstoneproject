const Transaction = require("../../models/Transaction");

module.exports = {

    Query: {
      async getTransactions() {
        try {
          const transactions = await Transaction.find();
          return transactions;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
  
    async getTransaction(_, { accountNumber }) {
      try {
        const transaction = await Transaction.find( accountNumber);
        if (transaction) {
          return transaction;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }

  }