const mongoose = require('mongoose');

// Define a schema for the student
const {loginSchema , Login} = require('./user.js');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Validate email format using a regex pattern`
        
    },
    rollno: {
        type: Number,
        required: true,
        unique: true
    },
    hostelroomno: {
        type: Number,
        required: true
    },
    id:Number,
    leaveCount : Number
});

// Create a model using the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;