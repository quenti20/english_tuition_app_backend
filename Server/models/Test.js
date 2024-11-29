const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
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
    }
});

const TestSchema = new mongoose.Schema({
    questions: {
        type: [QuestionSchema], // List of questions
        required: true
    },
    class: {
        type: Number, // Represents the class/grade
        required: true
    },
    board: {
        type: Number, // Represents the board ID or code
        required: true
    }
});

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
