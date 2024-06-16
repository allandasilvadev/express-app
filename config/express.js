const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const db = require('./database')();


module.exports = () => {
    const app = express();

    // configs
    app.set('port', process.env.APP_PORT || 4200);

    // middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    // routes
    app.get('/', (req, res) => {
        res.json({
            "message": "Application is running"
        });
    });

    app.get('/courses', (req, res) => {
        res.json(db);
    });

    app.get('/courses/:id', (req, res) => {
        let id = req.params.id;

        const course = db.courses.find((item) => {
            return item.id == id;
        });

        const response = course ? course : {};

        res.json(response);
    });

    return app;
};