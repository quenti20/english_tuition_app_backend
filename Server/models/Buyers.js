const mongoose = require('mongoose');

// Define the Buyers Schema
const BuyersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  buyer_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // Indian phone number validation
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  gstin: {
    type: String,
    match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, // GSTIN regex validation
  },
  address_line_1: {
    type: String,
    required: true,
    minlength: 5,
  },
  address_line_2: {
    type: String,
    default: '',
  },
  alternate_phone: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid alternate phone number!`,
    },
  },
  pincode: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 6,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds created_at and updated_at fields
});

// Export the Buyers model
const Buyers = mongoose.model('Buyers', BuyersSchema);
module.exports = Buyers;
