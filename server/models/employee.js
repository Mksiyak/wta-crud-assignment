const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    feedback: { type: String },
    salary: { type: Number },
    rating: { type:Number },
});

module.exports = { Employee };