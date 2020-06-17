const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    salary: { type: Number },
    description: { type: String }
});

module.exports = { Employee };