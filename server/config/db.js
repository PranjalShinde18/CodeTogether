const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL =  process.env.MONGOURL;

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