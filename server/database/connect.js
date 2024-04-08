const mongoose = require('mongoose');
const url = "mongodb+srv://dhruvD:demo123@cluster0.qk1u6ed.mongodb.net/login" 
// Function to connect to MongoDB
const connectToMongoDB = async () => {
    return new Promise( async (resolve , reject)=>{
        try {
            await mongoose.connect("mongodb+srv://dhruvD:demo123@cluster0.qk1u6ed.mongodb.net/login", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
            resolve(true)
        } catch (error) {
            console.error('Connection error:', error.message);
            reject(false);
        }
    })
};

module.exports = connectToMongoDB;      