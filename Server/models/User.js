const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        enum: ['5', '12', 'all'],
        required: true
    },
    board: {
        type: String,
        enum: ['wb', 'ics', 'cbs', 'all'],
        required: true
    },
    guardian_number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    payment_ss: {
        type: [String], // Assuming image URLs/paths are stored as strings
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
    date_of_admission: {
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
