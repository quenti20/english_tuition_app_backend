const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    Class: {
        type: String, // Restricts values to specific classes
        required: true
    },
    literature_time: {
        type: String,
    },
    grammer_time: {
        type: String,
    }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
