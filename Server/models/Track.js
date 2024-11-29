const mongoose = require('mongoose');

// Define the Track Schema
const TrackSchema = new mongoose.Schema({
  awb_id: {
    type: String,
    required: true,
    unique: true,
  },
  courier_description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  order_id: {
    type: String,
    required: true,
  },
  current_status: {
    type: String,
    enum: [
      'Pending',
      'In Transit',
      'Out for Delivery',
      'Delivered',
      'RTO Initiated',
      'RTO Delivered',
      'Cancelled',
      'Failed Delivery',
    ],
    required: true,
    default: 'Pending',
  },
  estimated_delivery: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds created_at and updated_at fields
});

// Export the Track model
const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
