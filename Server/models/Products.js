const mongoose = require('mongoose');

// Define the Products Schema
const ProductsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit_price: {
    type: mongoose.Decimal128,
    required: true,
    min: 0.0,
  },
  discount: {
    type: mongoose.Decimal128,
    default: 0.0,
    min: 0.0,
  },
  hsn: {
    type: String,
    required: true,
    match: /^[0-9]{4,8}$/, // HSN code usually ranges from 4 to 8 digits
  },
  product_category: {
    type: String,
    required: true,
  },
  return_tagged: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically adds created_at and updated_at fields
});

// Export the Products model
const Products = mongoose.model('Products', ProductsSchema);
module.exports = Products;
