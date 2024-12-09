const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Alumni = require('../models/Alumni')

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'alumni_images', // Folder in Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed image formats
    },
});

const upload = multer({ storage: storage });


exports.createAlumni = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { name, school, exam, marks } = req.body;

            // Validate required fields
            if (!name || !school || !exam || marks === undefined) {
                return res.status(400).json({ message: 'All required fields must be provided' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Image is required' });
            }

            const newAlumni = new Alumni({
                name,
                image: req.file.path, // Cloudinary URL
                school,
                exam,
                marks,
            });

            await newAlumni.save();
            res.status(201).json({ message: 'Alumni profile created successfully', alumni: newAlumni });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

exports.getAllAlumni = async (req, res) => {
    try {
        const alumniList = await Alumni.find();
        res.status(200).json({ message: 'Alumni profiles retrieved successfully', alumni: alumniList });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.updateAlumni = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;
            const { name, school, exam, marks } = req.body;

            const alumni = await Alumni.findById(id);
            if (!alumni) {
                return res.status(404).json({ message: 'Alumni profile not found' });
            }

            // Update image if a new one is uploaded
            if (req.file) {
                // Delete old image from Cloudinary
                if (alumni.image) {
                    const publicId = alumni.image.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
                    await cloudinary.uploader.destroy(`alumni_images/${publicId}`);
                }

                alumni.image = req.file.path; // Update with new Cloudinary URL
            }

            // Update other fields
            if (name) alumni.name = name;
            if (school) alumni.school = school;
            if (exam) alumni.exam = exam;
            if (marks !== undefined) alumni.marks = marks;

            await alumni.save();
            res.status(200).json({ message: 'Alumni profile updated successfully', alumni });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

exports.deleteAlumni = async (req, res) => {
    try {
        const { id } = req.params;

        const alumni = await Alumni.findById(id);
        if (!alumni) {
            return res.status(404).json({ message: 'Alumni profile not found' });
        }

        // Delete image from Cloudinary
        if (alumni.image) {
            const publicId = alumni.image.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
            await cloudinary.uploader.destroy(`alumni_images/${publicId}`);
        }

        await alumni.deleteOne();
        res.status(200).json({ message: 'Alumni profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
