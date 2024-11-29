const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  added_by: {
    type: String,
    required: true,
  },
  address_title: {
    type: String,
    required: true,
  },
  is_default: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 15,
  },
  alt_phone_number: {
    type: Number,
    minlength: 10,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  address_line_one: {
    type: String,
    required: true,
  },
  address_line_2: {
    type: String,
    default: '',
  },
  pin_code_id: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // Automatically manages created_at and updated_at
});

// Exporting the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
