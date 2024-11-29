const mongoose = require('mongoose');

// Define the Transaction Schema
const TransactionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  order_id: {
    type: String,
    required: true,
  },
  awb_number: {
    type: String,
    required: true,
  },
  narration: {
    type: String,
    maxlength: 500,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 0,
  },
  balance: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  linked_account: {
    type: String,
  },
  additional_info: {
    type: String,
    maxlength: 500,
  },
}, {
  timestamps: true, // Adds created_at and updated_at timestamps
});

// Export the Transaction model
const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
