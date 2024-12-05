const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    upi_id: {
        type: String,
        required: false
    },
    payment_qr: {
        type: String, // URL or file path for the payment QR image
        required: false
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
