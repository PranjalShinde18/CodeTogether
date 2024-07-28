const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/codetogether';

mongoose.connect(mongoURL, {})

const db = mongoose.connection;


db.on('connected', function () {
    console.log('Connected to MongoDB server \n');
});

db.on('disconnected', function () {
    console.log('Disconnected from MongoDB\n');
});

db.on('error', function (err) {
    console.log('Error connecting to MongoDB:' + err);
});

module.exports = db;