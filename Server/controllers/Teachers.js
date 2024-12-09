const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Teacher = require('../models/Teacher'); // Adjust the path as per your structure

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
        folder: 'teacher_profiles', // Folder in Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed image formats
    },
});

const upload = multer({ storage: storage });



exports.createTeacher = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { name, post, qualifications } = req.body;

            // Validate required fields
            if (!name || !post) {
                return res.status(400).json({ message: 'Name and post are required' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Image is required' });
            }

            // Create a new Teacher instance
            const newTeacher = new Teacher({
                name,
                post,
                qualifications,
                image: req.file.path, // Cloudinary URL
            });

            // Save the teacher to the database
            await newTeacher.save();

            res.status(201).json({ message: 'Teacher profile created successfully', teacher: newTeacher });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find(); // Fetch all teacher profiles
        res.status(200).json({ message: 'Teachers retrieved successfully', teachers });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.updateTeacher = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params; // Teacher ID from route params
            const { name, post, qualifications } = req.body;

            const teacher = await Teacher.findById(id);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }

            // Update image if a new one is uploaded
            if (req.file) {
                // Delete the old image from Cloudinary
                if (teacher.image) {
                    const publicId = teacher.image.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
                    await cloudinary.uploader.destroy(`teacher_profiles/${publicId}`);
                }

                teacher.image = req.file.path; // Update with new Cloudinary URL
            }

            // Update other fields
            if (name) teacher.name = name;
            if (post) teacher.post = post;
            if (qualifications) teacher.qualifications = qualifications;

            await teacher.save();
            res.status(200).json({ message: 'Teacher profile updated successfully', teacher });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params; // Teacher ID from route params

        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Delete the image from Cloudinary
        if (teacher.image) {
            const publicId = teacher.image.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
            await cloudinary.uploader.destroy(`teacher_profiles/${publicId}`);
        }

        await teacher.deleteOne();
        res.status(200).json({ message: 'Teacher profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
