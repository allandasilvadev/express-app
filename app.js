var app = require('./config/express')();
require('dotenv').config();

const credentials = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DB    
};

require('./config/db')(`mongodb://${credentials.host}:${credentials.port}/${credentials.db}`);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});