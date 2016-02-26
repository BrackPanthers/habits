// require modules
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'), // server logging package
    dotenv = require('dotenv').config(),
    config = require('./config');

// set up express and start app
var app = express();
var port = process.env.SERVER_PORT;

// set up middleware
var corsOptions = {
	origin: 'http://localhost/' + port
};
app.use(logger('dev')); // logs details any request made
app.use(cors());
app.use(bodyParser.json()); // parses any body into json

// set up and connect to mongolab db
var dbUri = process.env.PROD_DB_URI;
mongoose.connect(dbUri);
mongoose.connection.once('open', function() {
  console.log('MongoDB connected.');
});

// import routes from separate file, initialized to app
var routes = require('./routes')(app);

// start server listening
app.listen(port, function() {
  console.log('Server listening on ' +config.getip()+':'+ port);
});
