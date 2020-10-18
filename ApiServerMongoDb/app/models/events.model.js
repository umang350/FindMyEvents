const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    code: String,
    name: String,
	description: String,
    organizer : String,
    location: String,
    startDate: Date,
    endDate: Date,
    cost: Number,
    category: String,
    eventType: String
});

module.exports = mongoose.model('Event', EventSchema);