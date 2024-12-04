const Teacher = require('../models/Teacher'); // Adjust the path as per your structure

exports.createTeacher = async (req, res) => {
    try {
        const { name, post, qualifications, image } = req.body;

        // Validate required fields
        if (!name || !post) {
            return res.status(400).json({ message: 'Name and post are required' });
        }

        // Create a new Teacher instance
        const newTeacher = new Teacher({
            name,
            post,
            qualifications,
            image
        });

        // Save the teacher to the database
        await newTeacher.save();

        res.status(201).json({ message: 'Teacher profile created successfully', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find(); // Fetch all teacher profiles
        res.status(200).json({ message: 'Teachers retrieved successfully', teachers });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params; // Teacher ID from route params
        const updates = req.body;  // Updated fields from request body

        // Find and update the teacher
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true // Ensure validations are run
        });

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ message: 'Teacher profile updated successfully', teacher: updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params; // Teacher ID from route params

        // Find and delete the teacher
        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ message: 'Teacher profile deleted successfully', teacher: deletedTeacher });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};