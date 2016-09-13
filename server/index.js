'use strict';
/******** DEPENDENCIES ********/
let express       = require('express');
let app           = express();
let bodyParser    = require('body-parser');
let morgan        = require('morgan');
let path          = require('path');
/******** ROUTERS ********/
let TableRouter   = require('./routes/tableRouter.js');
let apiDeckRouter = require('./routes/apiDeckRouter.js');


//middleware
app.set('case sensitive routing', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan());

//STATIC FILES SO TASTY!
app.use( express.static(__dirname + '/../public') );

//ROUTERS
app.use("/table", TableRouter);
app.use("/api", apiDeckRouter);
app.get('/', function(req, res) {
  res.send('hey, yodahead, your server works');
});

//FIND A PORT O' CALL YA SAILOR
app.set( 'port', (process.env.PORT || 3000) );
app.listen(app.get('port'), function() {
  console.log('Chevy Chase is Going to War on Port', app.get('port'));
});

module.exports = app;



