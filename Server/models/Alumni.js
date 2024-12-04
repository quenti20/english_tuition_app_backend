const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL or file path for the alumni image
        required: false
    },
    school: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});

const Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;
