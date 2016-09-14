'use strict';
/******** DEPENDENCIES ********/
let express       = require('express');
let app           = express();
let bodyParser    = require('body-parser');
let morgan        = require('morgan');
let path          = require('path');
/******** ROUTERS ********/
let apiDeckRouter = require('./routes/apiDeckRouter.js');
let DrawOneRouter = require('./routes/drawOneRouter.js');
let WarRouter     = require('./routes/warRouter.js');

//middleware
app.set('case sensitive routing', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan());

//STATIC FILES SO TASTY!
app.use( express.static(__dirname + '/../client') );

//ROUTERS
app.use("/api", apiDeckRouter);
app.use("/war", WarRouter);
app.use("/draw_one", DrawOneRouter);

//HOME PAGE ROUTING
app.get('/', function(req, res) {
  res.send(index.html);
});

//FIND A PORT O' CALL YA SAILOR
app.set( 'port', (process.env.PORT || 3000) );
app.listen(app.get('port'), function() {
  console.log('Chevy Chase is Going to War on Port', app.get('port'));
});

module.exports = app;


