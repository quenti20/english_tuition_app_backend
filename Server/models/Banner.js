const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    image: {
        type: String, // List of image URLs or file paths
        required: true
    }
});

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
