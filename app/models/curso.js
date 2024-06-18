var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = () => {
    var CoursesSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number
        }
    });

    return mongoose.models.Curso || mongoose.model('Curso', CoursesSchema, 'cursos');
};