require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var adminRouter = require('./routes/adminRoute');
var colorRouter = require('./routes/colorRoute')
var brandRouter = require('./routes/brandRoute')
var categoryRouter = require('./routes/categoryRoute')
var users = require('./routes/users')
var reports = require('./routes/reportRoute')


var cors = require("cors")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//connetion to the dataBase

mongoose.connect(process.env.DBCONNECTION, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("successfully connected");
}).catch(console.error);

app.use('/api/Admin', adminRouter)
app.use('/api/color', colorRouter)
app.use('/api/category', categoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/user', users)
app.use('/api/report', reports)

// app.listen(5000)
module.exports = app;
