let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let menuitem = require('./app/routes/menuitem');
let config = require('config'); //load  db:uri JSON 
//db options
let options = { 
		server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 10000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 10000 } } 
              }; 

//db connection      
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "Main App"}));

app.route("/api/guicomponents/menu/menuitem")
	.get(menuitem.getMenuitems)
	.post(menuitem.postMenuitem);
app.route("/api/guicomponents/menu/menuitem/:id")
	.get(menuitem.getMenuitem)
	.delete(menuitem.deleteMenuitem)
	.put(menuitem.updateMenuitem);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
