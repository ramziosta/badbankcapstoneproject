const { model, Schema } = require("mongoose");

const transactionSchema = new Schema({
  username: String,
  email: String,
  accountNumber:String,
  accountType: String,
  transactionAmount: String,
  transactionType: String,
  transactionDate: Date,

});

module.exports = model("Transaction", transactionSchema);
