var app = require('./config/express')();

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});