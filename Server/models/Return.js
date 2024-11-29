const mongoose = require('mongoose');

// Define the Return Schema
const ReturnSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  buyer_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: [String], // Array of product IDs
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  return_label: {
    type: String,
    enum: ['Damaged', 'Defective', 'Wrong Item', 'Changed Mind', 'Other'],
    required: true,
  },
  comments: {
    type: String,
    maxlength: 500,
  },
  return_image: {
    type: String, // URL or image path
  },
  warehouse_id: {
    type: String,
    required: true,
  },
  weight: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  length: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  width: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  height: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  grand_total: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true, // Adds created_at and updated_at timestamps
});

// Export the Return model
const Return = mongoose.model('Return', ReturnSchema);
module.exports = Return;
