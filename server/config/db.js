const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongouri');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: true });

        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = connectDB;