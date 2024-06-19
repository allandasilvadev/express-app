const db = require('../../config/database')();

module.exports = (app) => {
    const Course = app.models.curso;

    return {
        index: async (req, res) => {
            var courses = await Course.find({}, ['name', 'category', 'price'], { sort: { price: 1 } }).exec();

            return res.render('home/index', {
                title: 'Hi, friends',
                courses: courses.map(course => course.toObject())
            });
        }
    }
}