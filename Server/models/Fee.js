const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
    class: {
        type: Number, // Represents the class/grade
        required: true
    },
    board: {
        type: Number, // Represents the board ID or code
        required: true
    },
    medium: {
        type: String, // Medium of instruction
        enum: ['English', 'Hindi', 'Bengali'], // Add relevant mediums as needed
        required: true
    },
    fee: {
        type: Number, // Fee amount
        required: true
    }
});

const Fee = mongoose.model('Fee', FeeSchema);

module.exports = Fee;
