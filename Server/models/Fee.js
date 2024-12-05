const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
    class: {
        type: String, // Represents the class/grade
        required: true
    },
    
    fee: {
        type: Number, // Fee amount
        required: true
    }
});

const Fee = mongoose.model('Fee', FeeSchema);

module.exports = Fee;
