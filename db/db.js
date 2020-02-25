const mongoose = require('mongoose');
const User = require('../models/user');

const connectionString = 'mongodb://localhost/community-cards';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);

});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose error:', error)
});