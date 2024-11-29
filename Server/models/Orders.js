const mongoose = require('mongoose');

// Enum values for different fields
const orderTypes = ['Standard', 'Express'];
const orderStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
const rovTypes = ['Forward', 'Reverse'];
const paymentTypes = ['Prepaid', 'COD'];
const packageTypes = ['Box', 'Envelope', 'Pouch'];
const statuses = ['Active', 'Inactive', 'Deleted'];

const OrdersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  reference_id: {
    type: String,
    required: true,
    unique: true,
  },
  awb_no: {
    type: String,
    required: true,
    unique: true,
  },
  order_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  order_type: {
    type: String,
    enum: orderTypes,
    required: true,
  },
  order_status: {
    type: String,
    enum: orderStatuses,
    default: 'Pending',
    required: true,
  },
  rov_type: {
    type: String,
    enum: rovTypes,
    required: true,
  },
  payment_type: {
    type: String,
    enum: paymentTypes,
    required: true,
  },
  products: {
    type: [String], // Array of strings
    required: true,
  },
  shipping_charges: {
    type: mongoose.Decimal128,
    required: true,
    default: 0.0,
  },
  package_weight: {
    type: mongoose.Decimal128,
    required: true,
    default: 0.0,
  },
  package_type: {
    type: String,
    enum: packageTypes,
    required: true,
  },
  length: {
    type: mongoose.Decimal128,
    required: true,
    default: 0.0,
  },
  width: {
    type: mongoose.Decimal128,
    required: true,
    default: 0.0,
  },
  height: {
    type: mongoose.Decimal128,
    required: true,
    default: 0.0,
  },
  status: {
    type: String,
    enum: statuses,
    default: 'Active',
    required: true,
  },
  buyer_id: {
    type: String,
    required: true,
  },
  warehouse_id: {
    type: String,
    required: true,
  },
  reseller_name: {
    type: String,
    default: '',
  },
  GSTIN: {
    type: String,
    match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
    default: '',
  },
}, {
  timestamps: true, // Automatically adds created_at and updated_at fields
});

// Exporting the Orders model
const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;
