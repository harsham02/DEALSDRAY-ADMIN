const mongoose = require('mongoose');

const connectDB = async() => {
    try{
           const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://harshavardhan15015:harshavardhan15015@dealsdray.6b1qf.mongodb.net/?retryWrites=true&w=majority&appName=DealsDray");
           console.log("db connected");
    }catch (error){
         console.log(`error: ${error.message}`);
         process.exit();
    }
};

module.exports = connectDB;