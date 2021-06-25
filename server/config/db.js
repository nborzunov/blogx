const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongouri');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true });

        console.log("Successfully connected to MongoDB");
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = connectDB;