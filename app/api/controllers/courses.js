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
        get: async (req, res) => {

            try {
                const id = req.params.id;
                const course = await Course.findById(id, 'name category price');

                if ( course == null ) {
                    return res.status(404).json({});
                }
                res.status(200).json({course});

            } catch (error) {                
                res.status(404).json({ message: error.message });
            }

        },
        create: async (req, res) => {
            try {                
                if ( Object.keys(req.body).length == 0 ) {
                    return res.status(400).json({
                        "message": "Required data not provided: 'name', 'category' and 'price' are missing."
                    });
                }

                const new_course = new Course(req.body);
                await new_course.save();
                const created_course = await Course.findById(new_course.id, 'name category price');
           
                res.status(201).json(created_course);
            } catch (error) {
                res.status(422).json({ message: error.message });
            }
        },
        
        
        update: async (req, res) => {
            try {
                var courseId = req.params.id;
                const course = await Course.findById(courseId, 'name category price');


                if ( course == null ) {
                    return res.status(404).json({
                        message: `Course with id ${req.params.id} not found.`
                    });
                }

                var updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true});

                // importante o status 204, nao permite retornar conteudo
                res.status(200).json(updatedCourse);

            } catch (error) {
                res.status(404).json({ message: `Course with id ${req.params.id} not found.`});
            }
        },

        delete: async (req, res) => {
            try {
                var courseId = req.params.id;
                var course = await Course.findById(courseId, 'name category price');
               
                if ( course == null ) {
                    return res.status(404).json({
                        message: `Course with id ${req.params.id} not found.` 
                    });
                }

                await Course.findByIdAndDelete(courseId);

                res.status(200).json({
                    message: "Course deleted with successfully."
                });

            } catch (error) {
                res.status(500).json({
                    message: `Internal server error: ${error.message}.`
                });
            }
        }
    };
};