const Alumni  = require('../models/Alumni')

exports.createAlumni = async (req, res) => {
    try {
        const { name, image, school, exam, marks } = req.body;

        // Validate required fields
        if (!name || !school || !exam || marks === undefined) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const newAlumni = new Alumni({
            name,
            image,
            school,
            exam,
            marks
        });

        await newAlumni.save();
        res.status(201).json({ message: 'Alumni profile created successfully', alumni: newAlumni });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.getAllAlumni = async (req, res) => {
    try {
        const alumniList = await Alumni.find();
        res.status(200).json({ message: 'Alumni profiles retrieved successfully', alumni: alumniList });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.updateAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find and update the alumni profile
        const updatedAlumni = await Alumni.findByIdAndUpdate(id, updates, {
            new: true, // Return updated document
            runValidators: true // Ensure schema validations
        });

        if (!updatedAlumni) {
            return res.status(404).json({ message: 'Alumni profile not found' });
        }

        res.status(200).json({ message: 'Alumni profile updated successfully', alumni: updatedAlumni });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


exports.deleteAlumni = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the alumni profile
        const deletedAlumni = await Alumni.findByIdAndDelete(id);

        if (!deletedAlumni) {
            return res.status(404).json({ message: 'Alumni profile not found' });
        }

        res.status(200).json({ message: 'Alumni profile deleted successfully', alumni: deletedAlumni });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
