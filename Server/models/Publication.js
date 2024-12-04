const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    image: {
        type: String, // URL or file path for the publication image
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    link: {
        type: String, // URL linking to the publication
        required: false
    },
    desc: {
        type: String, // Description of the publication
        required: false
    },
    user_login: {
        type: Boolean, // Indicates if login is required to access the publication
        default: false
    }
});

const Publication = mongoose.model('Publication', PublicationSchema);

module.exports = Publication;
