'use strict';
let express     = require('express');
let app         = express();
let bodyParser  = require('body-parser');
let morgan      = require('morgan');
let path        = require('path');

app.set('case sensitive routing', false);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan());

//STATIC FILES SO TASTY!
app.use( express.static(__dirname + '/../public') );

app.get('/', function(req, res) {
  res.send('hey, yodahead, your server works');
});
app.get('/warboard', function(req, res) {
  res.send('Oh, lookie here you gotta nother page!')
});
//FIND A PORT O' CALL YA SAILOR
app.set( 'port', (process.env.PORT || 3000) );
app.listen(app.get('port'), function() {
  console.log('Chevy Chase is Going to War on Port', app.get('port'));
});

module.exports = app;



