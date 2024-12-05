const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    class: {
        type: String,
        enum: ['5', '6', '7', '8', '9', '10', '11', '12','all'], // Restricts values to specific classes
        required: true
    },
    board: {
        type: String,
        enum: ['WBSE', 'CBSE', 'CISCE','all'], // Allows only specific board types
        required: true
    },
    type: {
        type: String,
        enum: ['grammar', 'literature'], // Allows only 'grammar' or 'literature'
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
