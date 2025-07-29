import mongoose from "mongoose";
const URLMONGODB  = process.env.URLMONGODB
const connectDB = async () => {
    try {
        await mongoose.connect(URLMONGODB)
       console.log('MongoDB connected!');
    } catch (error) {
           console.error('MongoDB connection error:', error.message);
    }
}

module.exports = connectDB