// server.js
// set up 
  var express  = require('express');
  var app      = express();                                     // create our app w/ express
  var mongoose = require('mongoose');                           // mongoose for mongodb
  var morgan = require('morgan');                               // log requests(express4)
  var bodyParser = require('body-parser');                      // pull info from HTML POST (express4)
  var methodOverride = require('method-override');              // simulate DELETE and PUT (express4)

// configuration 
  mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect

  app.use(express.static(__dirname + '/public'));                 // set the static files location: 
								  ///public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the conso
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());

 // start node server.js 
  app.listen(8080);
  console.log("App listening on port 8080");
