const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const consign = require('consign');
const application = express();
// const database = require('./database')();
const expressSession = require('express-session');

application.set('view engine', 'EJS');
application.set('views', './app/views');

application.use(bodyParser.urlencoded({extended : true}));
application.use(expressValidator());
application.use(express.static('./app/public'));
application.use(expressSession({
    secret : 'tokenvalidacacousuario',
    resave : false,
    saveUninitialized : false
}));

consign().include('app/routes')
    .then('/config/database.js')
    .then('/app/controllers')
    .then('/app/models')
    .into(application);

module.exports = application;