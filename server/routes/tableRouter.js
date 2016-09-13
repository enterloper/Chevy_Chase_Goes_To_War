'use strict';
let express     = require('express');
let TableRouter = express.Router();


//TABLE PAGE ROUTE
TableRouter.get('/', function(req, res) {
  res.send('Oh, lookie here you gotta nother page!')
});


module.exports = TableRouter;



