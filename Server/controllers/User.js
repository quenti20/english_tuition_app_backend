const User = require('../models/User'); // Adjust path as per your structure

exports.createNewUser = async (req, res) => {
    try {
        const {
            id,
            name,
            email,
            phone_number,
            Class,
            board,
            guardian_number,
            DOB,
            payment_ss,
            payment_status,
            date_of_approval,
            active_status,
            exam_score,
            attendance,
            is_admin
        } = req.body;

        // Validate required fields
        if (!name || !email || !phone_number || !Class || !board || !guardian_number || !DOB) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // // Format DOB to ddmmyyyy for password
        // const formattedDOB = new Date(DOB);
        // console.log(formattedDOB);
        // const password = `${String(formattedDOB.getDate()).padStart(2, '0')}${String(formattedDOB.getMonth() + 1).padStart(2, '0')}${formattedDOB.getFullYear()}`;
        // console.log(formattedDOB.getDate())
        const password = DOB ;
        const newUser = new User({
            name,
            email,
            phone_number,
            Class,
            board,
            guardian_number,
            DOB,
            password, // Consider hashing the password before saving
            payment_ss,
            payment_status,
            date_of_approval,
            date_of_admission_request: new Date(),
            active_status,
            exam_score,
            attendance,
            is_admin
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Successful login
        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                Class: user.Class,
                board: user.board,
                is_admin: user.is_admin
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the user ID is passed as a route parameter
        const updates = req.body; // Fields to update

        // Validate if the user ID is provided
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true // Ensure the updates follow schema validation
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({
            message: 'Users retrieved successfully',
            users
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Assuming user ID is passed as a route parameter

        // Validate if the user ID is provided
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser
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


