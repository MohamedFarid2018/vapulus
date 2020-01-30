const express = require('express');

const app = express();

require('dotenv').config();
global.Promise = require('bluebird');
global._ = require('lodash');

require('./startup/db').connect();
require('./startup/logging').handleErrors();
require('./startup/middlewares')(app);
require('./startup/routes')(app);

module.exports = app;
