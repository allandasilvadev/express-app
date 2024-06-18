const mongoose = require('mongoose');
require('dotenv').config();

const credentials = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DB    
};

module.exports = {
    open_connection: async () => {
        await mongoose.connect(`mongodb://${credentials.host}:${credentials.port}/${credentials.db}`);
    },
    clear_database: async () => {
        const collections = mongoose.connection.collections;

        for( const key in collections ) {
            const collection = collections[key];
            await collection.deleteMany({});
        }        
    },
    close_connection: async () => {
        process.on('SIGINT', async () => {
            await mongoose.connection.close(() => {
                console.log(`Mongoose closed!`);
                process.exit(0);
            });
        });
        // await mongoose.connection.close();
    }
};