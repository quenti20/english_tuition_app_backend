const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    phone_number: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        enum: ['5','6','7','8','9','10','11','12', 'all'],
        required: true
    },
    board: {
        type: String,
        enum: ['WBSE', 'CISCE', 'CBSE', 'All'],
        required: true
    },
    guardian_number: {
        type: String,
        required: true
    },
    DOB:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    payment_ss: {
        type: String, // Assuming image URLs/paths are stored as strings
        required: false
    },
    payment_status: {
        type: Boolean,
        default: false
    },
    date_of_approval: {
        type: Date,
        required: false
    },
    date_of_admission_request: {
        type: Date,
        required: false
    },
    active_status: {
        type: Boolean,
        default: true
    },
    exam_score: {
        type: [Number], // List of integers
        required: false
    },
    attendance: {
        type: Number,
        default: 0
    },
    is_admin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
