const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/hotel';  // Use IPv4 address

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.on('disconnected', (error) => {
    console.error('disconnected from MongoDB server');
});

module.exports = db;
