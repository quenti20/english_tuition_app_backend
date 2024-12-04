const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String], // List of 4 options
        validate: [array => array.length === 4, 'Exactly 4 options are required.'],
        required: true
    },
    correctOption: {
        type: Number, // Index of the correct option (0-3)
        required: true,
        min: 0,
        max: 3
    },
    Class: {
        type: String,
        enum: ['5','6','7','8','9','10','11','12', 'all'],
        required: true
    },
    board: {
        type: String,
        enum: ['WBSE', 'CISCE', 'CBSE', 'All'],
        required: false
    }
});

// const TestSchema = new mongoose.Schema({
//     questions: {
//         type: [QuestionSchema], // List of questions
//         required: true
//     },
//     class: {
//         type: Number, // Represents the class/grade
//         required: true
//     },
//     board: {
//         type: Number, // Represents the board ID or code
//         required: true
//     }
// });

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
