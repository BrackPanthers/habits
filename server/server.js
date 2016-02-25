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
var port = config.port;

// set up middleware
app.use(bodyParser.json()); // parses any body into json

// set up and connect to mongolab db
// var dbUri = config.dbUri;
// mongoose.connect(dbUri);
// mongoose.connection.once('open', function() {
//   console.log('MongoDB connected.');
// });

// import routes from separate file, initialized to app
var routes = require('./routes')(app);

// start server listening
app.listen(port, function() {
  console.log('Server listening on port', port);
});
