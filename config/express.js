const express = require('express');
const consign = require('consign');
require('dotenv').config();
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

module.exports = () => {
    const app = express();
    const hbs = expressHbs.create({
        layoutsDir: './app/views/layouts',
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {}
    });

    // configs
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', './app/views');
    app.set('port', process.env.APP_PORT || 4200);

    // middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    consign({cwd:'app', verbose: false})
        .include('api/models')
        .then('models')
        .then('api/controllers')
        .then('controllers')
        .then('api/routes')
        .then('routes')
        .into(app);   

    return app;
};