const db = require('../../config/database')();

module.exports = (app) => {
    return {
        index: (req, res) => {
            /*
            res.json({
                "message": "Application is running"
            });
            */
            res.render('home/index', {
                title: 'Hi, friends',
                courses: db.courses
            });
        }
    }
}