const { model, Schema } = require("mongoose");

const accountSchema = new Schema({
    
  accountNumber: Number,
  accountType: String,
  createdAt: String,
  balance: Number,
  username: String,
  email: String,
 
});

module.exports = model("Account", accountSchema);
