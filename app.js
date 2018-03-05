const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users')

mongoose.connect('mongodb://localhost/codetestusers')
// mongoose.connect('mongodb+srv://ldpeery:' + process.env.MONGO_ATLAS_PW + '@code-test-age61.mongodb.net/test');

//use morgan to log requests --used for development
app.use(morgan('dev'));

//use body parser to handle incoming data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//handle/prevent cors errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//For this project only using one route.
app.use('/users', userRoutes);

//To handle undefined routes errors
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//To catch DB/other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;