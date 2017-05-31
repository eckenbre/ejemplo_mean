// Load required packages

var bodyParser = require('body-parser');
var path = require('path');
// Create our Express application
var express = require('express')
  , app = express()

var mongoose     = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//habilito CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();


app.use(express.static('public'));
app.use('/', require('./routes/api'))

//-----------------------------------------------------------

// Register all our routes with /api
app.use('/', router);


// Start the server
app.listen(port);
console.log("Starting Floo network....")
console.log('Angular ToDo App listening on port : ' + port);