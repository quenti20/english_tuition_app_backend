const Schedule = require('../models/Schedule'); // Adjust path based on your project structure

// Create a new schedule
exports.createSchedule = async (req, res) => {
    try {
        const { Class, literature_time,grammer_time,board} = req.body;

        // Validate required fields
        if (!Class) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newSchedule = new Schedule({
            Class,
            literature_time,
            grammer_time,
            board
        });

        await newSchedule.save();
        res.status(201).json({ message: 'Schedule created successfully', schedule: newSchedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json({ message: 'Schedules retrieved successfully', schedules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Get a specific schedule by ID
exports.getScheduleById = async (req, res) => {
    try {
        const { id } = req.params;

        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json({ message: 'Schedule retrieved successfully', schedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Update a schedule
exports.updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { Class, literature_time,grammer_time } = req.body;

        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // Update fields if provided in request
        if (Class) schedule.Class = Class;
        if (literature_time) schedule.literature_time = literature_time;
        if (grammer_time) schedule.grammer_time = grammer_time;
        if (board) schedule.board = board;
    

        await schedule.save();
        res.status(200).json({ message: 'Schedule updated successfully', schedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Delete a schedule
exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        await schedule.deleteOne();
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};
