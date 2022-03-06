const mongoose = require("mongoose");

const { Schema } = mongoose;

// Transactions model
const TransactionSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  service: String,
  details: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  performedAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
