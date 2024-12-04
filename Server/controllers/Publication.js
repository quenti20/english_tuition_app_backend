const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Publication = require('../models/Publication');

// Ensure directories exist or create them
const ensureDirectories = () => {
    const uploadDir = 'uploads';
    const publicationDir = path.join(uploadDir, 'publication_uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    if (!fs.existsSync(publicationDir)) {
        fs.mkdirSync(publicationDir);
    }

    return publicationDir;
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const publicationDir = ensureDirectories();
        cb(null, publicationDir); // Set the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpeg, .jpg, and .png files are allowed'));
        }
    }
}).single('image'); // Single image upload

exports.createPublication = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { name, author, link, desc, user_login } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'Image is required' });
            }

            const newPublication = new Publication({
                image: req.file.path, // Store the file path
                name,
                author,
                link,
                desc,
                user_login
            });

            await newPublication.save();
            res.status(201).json({ message: 'Publication created successfully', publication: newPublication });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

exports.getPublicationDetails = async (req, res) => {
    try {
        const publications = await Publication.find();

        // Modify the image path to be accessible via URL
        const publicationsWithImageURL = publications.map(publication => ({
            ...publication._doc,
            image: `${req.protocol}://${req.get('host')}/${publication.image}`
        }));

        res.status(200).json({
            message: 'Publications retrieved successfully',
            publications: publicationsWithImageURL
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};