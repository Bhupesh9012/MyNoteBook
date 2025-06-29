require("dotenv").config();
const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // <-- FIXED HERE

        await mongoose.connect(mongoURI);
        console.log("connected to mongo Successfully");
    } catch (error) {
        console.error("Mongo connection error:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;