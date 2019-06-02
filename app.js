const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', feedRoutes);

mongoose
    .connect(
        'mongodb+srv://admin:r5d4bJWRoyUVD4aA@cluster0-ydvjq.mongodb.net/messages?retryWrites=true&w=majority'
    )   
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
