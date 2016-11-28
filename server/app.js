var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

app.use(cors());

//to parse incoming requests so we can access req.body.whatever
app.use(bodyParser.json());

// Robin's logger for incoming requests
app.use(function(req, res, next) {   console.log(     `${Date()} ${req.method} ${req.url}     ${req.body}`);   next(); });



var __projectRoot = path.join(__dirname, '../');
app.use(express.static(__projectRoot));
// app.use(express.static(__projectRoot + '/app'));
app.get('/', function (req, res) {
  res.sendFile(__projectRoot + 'app/app.component.html');
});


//for more verbose server logging
app.use(logger('dev'));

//to connect to routes
require('./routes/routes.js')(app, express);

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('server is listening on', port);
});

module.exports = app;
