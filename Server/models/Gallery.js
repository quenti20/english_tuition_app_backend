const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    image: {
        type: String, // List of image URLs or file paths
        required: true
    }
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;
