const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    image: {
        type: String, // Assuming the image is stored as a URL or file path
        required: true
    }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
