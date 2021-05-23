var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var auth = require('./auth')
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var categoriesRouter = require('./routes/categories');
var gamesRouter = require('./routes/games');
var ordersRouter = require('./routes/orders');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/games', gamesRouter);
app.use('/orders', ordersRouter);

module.exports = app;
