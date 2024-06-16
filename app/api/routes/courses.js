module.exports = (app) => {
    const controller = app.api.controllers.courses;

    app.get('/courses', controller.index);

    app.get('/courses/:id', controller.get);
    
};