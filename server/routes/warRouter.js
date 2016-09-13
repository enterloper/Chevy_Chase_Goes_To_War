'use strict';
let express     = require('express');
let WarRouter = express.Router();


//War PAGE ROUTE
WarRouter.get('/', function(req, res) {
  res.send('Oh, lookie here you gotta nother page!')
});


module.exports = WarRouter;



