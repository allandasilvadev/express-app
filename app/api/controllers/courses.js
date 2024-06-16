const db = require('../../../config/database')();

module.exports = (app) => {    
    return {
        index: (req, res) => {
            res.json(db);
        },
        get: (req, res) => {
            let id = req.params.id;

            const course = db.courses.find((item) => {
                return item.id == id;
            });

            const response = course ? course : {};

            res.json(response);
        }   
    };
};