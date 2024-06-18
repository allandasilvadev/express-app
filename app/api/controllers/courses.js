const db = require('../../../config/database')();


module.exports = (app) => {  
    const Course = app.models.curso;

    return {
        index: async (req, res) => {
            try {
                const fields = { _id: 0, __v: 0 };                
                const courses = await Course.find({}, fields, { sort: { price: 1} } );
                res.status(200).json({ "courses": courses });
            } catch (error) {
                res.status(500).json({ message: error.message });;
            }
            // res.json(db);
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