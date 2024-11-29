const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    banner: {
        type: [String], // List of image URLs or file paths
        required: true
    },
    gallery: {
        type: [String], // List of image URLs or file paths
        required: true
    },
    upi_id: {
        type: String,
        required: true
    },
    payment_qr: {
        type: String, // URL or file path for the payment QR image
        required: true
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
