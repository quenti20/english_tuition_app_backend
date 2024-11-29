const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user_login: {
        type: Boolean, // Indicates if login is required to access the note
        default: false
    },
    pdf_file: {
        type: String, // URL or file path for the PDF file
        required: true
    },
    class: {
        type: Number, // Represents the class/grade
        required: true
    },
    board: {
        type: Number, // Represents the board ID or code
        required: true
    },
    image: {
        type: String, // URL or file path for the image
        required: true
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
