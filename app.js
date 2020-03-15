const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


const userRoutes = require('./api/routers/user');
const bookRoutes = require('./api/routers/book');

const url = process.env.MONGODB_URI || `mongodb+srv://isagul:${process.env.MONGO_PW}@nytimes-2enjo.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accecpt, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);
app.use('/book', bookRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;