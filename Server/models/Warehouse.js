const mongoose = require('mongoose');

// Define the Warehouse Schema
const WarehouseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  alternate_phone: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid alternate phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  address_line_1: {
    type: String,
    required: true,
    maxlength: 150,
  },
  address_line_2: {
    type: String,
    maxlength: 150,
  },
  pincode: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{6}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid pincode!`,
    },
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
  },
  default_address: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds created_at and updated_at timestamps
});

// Export the Warehouse model
const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
module.exports = Warehouse;
