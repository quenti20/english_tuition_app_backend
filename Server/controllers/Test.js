const Test = require('../models/Test'); // Adjust path as needed

exports.createTest = async (req, res) => {
    try {
        const { question, options, correctOption,Class,board } = req.body;

        console.log(req.body) ;
        // Validate required fields
        if (!question || !options || !correctOption || !Class ) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        const newTest = new Test({
            question,
            options,
            correctOption,
            Class,
            board
        });

        await newTest.save();
        res.status(201).json({ message: 'Test created successfully', test: newTest });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json({ message: 'Tests retrieved successfully', tests });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find and update the test
        const updatedTest = await Test.findByIdAndUpdate(id, updates, {
            new: true, // Return updated document
            runValidators: true // Ensure schema validations
        });

        if (!updatedTest) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.status(200).json({ message: 'Test updated successfully', test: updatedTest });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the test
        const deletedTest = await Test.findByIdAndDelete(id);

        if (!deletedTest) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.status(200).json({ message: 'Test deleted successfully', test: deletedTest });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
