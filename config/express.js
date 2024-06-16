const express = require('express');
require('dotenv').config();

module.exports = () => {
    const app = express();

    // configs
    app.set('port', process.env.APP_PORT || 4200);

    // routes
    app.get('/', (req, res) => {
        res.json({
            "message": "Application is running"
        });
    });

    return app;
};