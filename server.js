// server.js
// set up 
  var express  = require('express');
  var app      = express();                                     // create our app w/ express
  var mongoose = require('mongoose');                           // mongoose for mongodb
  var morgan = require('morgan');                               // log requests(express4)
  var bodyParser = require('body-parser');                      // pull info from HTML POST (express4)
  var methodOverride = require('method-override');              // simulate DELETE and PUT (express4)

// configuration 
  mongoose.connect('mongodb://localhost/api/gui/menu');     // connect

  app.use(express.static(__dirname + '/public'));                 // set the static files location: 
								  ///public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the conso
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());
// define model
  var menuItem = mongoose.model('menuItem', {
    title : String,
    goUrl: String,
    apiRes: String
  });
//routing
// get all menuItems
  app.get('/api/gui/menu/menuItem', function(req, res) {
    console.log("get");
    // use mongoose to get all menuItems in the database
    menuItem.find(function(err, menuItems) {
      if (err)
        res.send(err)
      res.json(menuItems);                                            // return all menuItems in JSON format
     });
  });
  app.post('/api/gui/menu/menuItem', function(req, res) {        // create menuItem and send back all menuItems 
                                                                  // after creation
    console.log("put");
    menuItem.create({                                                 // create a menuItem, information comes from AJAX   
      text : req.body.text,                                       // request from Angular
      done : false
    }, function(err, menuItem) {
         if (err)
           res.send(err);
         menuItem.find(function(err, menuItems) {
           if (err)
             res.send(err)
           res.json(menuItems);
         });
       });
    });

    // delete a menuItem
    app.delete('/api/gui/menu/menuItem:menuItem_id', function(req, res) {
      console.log("delete");
      menuItem.remove({
        _id : req.params.menuItem_id
      }, function(err, menuItem) {
           if (err)
             res.send(err);
           // get and return all the menuItems after you create another
           menuItem.find(function(err, menuItems) {
             if (err)
               res.send(err)
             res.json(menuItems);
            });
         });
    });

 // start node server.js 
  app.listen(8080);
  console.log("App listening on port 8080");
