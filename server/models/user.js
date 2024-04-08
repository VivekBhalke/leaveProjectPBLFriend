//this is going to contain user schema
const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    id: Number
});
const Login = mongoose.model('login', loginSchema);
module.exports = {
    loginSchema: loginSchema,
    Login: Login
};
