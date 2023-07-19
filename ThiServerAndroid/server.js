const express = require('express');
const app = express();
const port = 3030
const mongoose = require('mongoose');
const expressHbs = require('express-handlebars');
var config = require('./config/database');
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

const apiRoute = require('./routes/api.js')
const indexRoute = require('./routes/index.js')

app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    defaultLayout: 'layouts',
    layoutDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowedProtoMethodsByDefault: true
    }
}));

app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/api', apiRoute);
app.use('/', indexRoute);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})