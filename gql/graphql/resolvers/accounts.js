const Account = require("../../models/Account");

module.exports = {

    Query: {
      async getAccounts() {
        try {
          const accounts = await Account.find();
          return accounts;
        } catch (err) {
          throw new Error(err);
        }
      }
    },

    async getAccount(_, { accountNumber }) {
      try {
        const account = await Account.find(accountNumber);
        if (account) {
          return account;
        } else {
          throw new Error('Account not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  
  
  }