const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    notes_name: {
        type: String,
        required:true
    },
    user_login: {
        type: Boolean, // Indicates if login is required to access the note
        default: false
    },
    pdf_file: {
        type: String, // URL or file path for the PDF file
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
    image: {
        type: String, // URL or file path for the image
        required: true
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
