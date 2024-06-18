const mongoose = require('mongoose');

module.exports = (uri) => {
    mongoose.connect(uri);

    mongoose.connection.on('connected', () => {
        console.log(`Mongoose connected in uri: ${uri}`);
    });

    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose disconnected`);
    });

    mongoose.connection.on('error', (err) => {
        console.log(`Mongoose error: ${err}`);
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`Mongoose closed!`);
            process.exit(0);
        });
    });
};