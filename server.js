// server.js
// set up 
  var express  = require('express');
  var app      = express();                                     // create our app w/ express
  var mongoose = require('mongoose');                           // mongoose for mongodb
  var morgan = require('morgan');                               // log requests(express4)
  var bodyParser = require('body-parser');                      // pull info from HTML POST (express4)
  var methodOverride = require('method-override');              // simulate DELETE and PUT (express4)

// configuration 
  mongoose.connect('mongodb://localhost/EventDesk');     // connect

  app.use(express.static(__dirname + '/public'));                 // set the static files location: 
								  ///public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the conso
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());
// define model
  var MenuItem = mongoose.model('MenuItem', {
    title : String,
    goUrl: String,
    apiRes: String
  });
//routing
// get all todos
  app.get('/api/todos', function(req, res) {
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);                                      // return all todos in JSON format
        });
    });
  app.post('/api/todos', function(req, res) {                     // create todo and send back all todos 
                                                                  // after creation
    Todo.create({                                                 // create a todo, information comes from AJAX   
      text : req.body.text,                                       // request from Angular
      done : false
    }, function(err, todo) {
         if (err)
           res.send(err);
         Todo.find(function(err, todos) {
           if (err)
             res.send(err)
           res.json(todos);
         });
       });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

 // start node server.js 
  app.listen(8080);
  console.log("App listening on port 8080");
