const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const User = require('../models/User');

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
        folder: 'payment_screenshots', // Folder for payment screenshots
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed image formats
    },
});

const upload = multer({ storage });

// Create a new user
exports.createNewUser = (req, res) => {
    upload.single('payment_ss')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
            console.log(err)
        }

        try {
            const {
                name,
                email,
                phone_number,
                Class,
                board,
                guardian_number,
                DOB,
                payment_status,
                date_of_approval,
                active_status,
                exam_score,
                attendance,
                is_admin,
            } = req.body;

            // Validate required fields
            if (!name || !email || !phone_number || !Class || !board || !guardian_number || !DOB) {
                return res.status(400).json({ message: 'All required fields must be provided' });
            }

            const password = DOB;  // Use DOB as the initial password (consider hashing for production)

            // Check if payment screenshot is provided
            if (!req.file) {
                return res.status(400).json({ message: 'Payment screenshot is required' });
            }

            const newUser = new User({
                name,
                email,
                phone_number,
                Class,
                board,
                guardian_number,
                DOB,
                password,
                payment_ss: req.file.path, // Store Cloudinary URL
                payment_status,
                date_of_approval,
                date_of_admission_request: new Date(),
                active_status,
                exam_score,
                attendance,
                is_admin,
            });

            await newUser.save();
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Update an existing user
exports.updateUser = (req, res) => {
    upload.single('payment_ss')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const { id } = req.params;
            const updates = req.body;

            // Find the user by ID
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the payment screenshot if a new one is uploaded
            if (req.file) {
                // Delete old payment screenshot from Cloudinary
                if (user.payment_ss) {
                    const publicId = user.payment_ss.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`payment_screenshots/${publicId}`);
                }

                updates.payment_ss = req.file.path; // Set new Cloudinary URL
            }

            // Update other fields
            Object.assign(user, updates);

            await user.save();
            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    });
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete payment screenshot from Cloudinary
        if (user.payment_ss) {
            const publicId = user.payment_ss.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`payment_screenshots/${publicId}`);
        }

        // Delete the user record from the database
        await user.deleteOne();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({
            message: 'Users retrieved successfully',
            users,
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// User login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                Class: user.Class,
                board: user.board,
                phone_number: user.phone_number,
                guardian_number: user.guardian_number,
                exam_score: user.exam_score,
                attendance: user.attendance,
                is_admin: user.is_admin
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params; // User ID from route params
        const { oldPassword, newPassword } = req.body; // Old and new passwords from request body

        // Validate input
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Old password and new password are required' });
        }

        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify old password
        if (user.password !== oldPassword) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Update user's password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};