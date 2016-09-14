'use strict';
let express     = require('express');
let WarRouter = express.Router();



//War PAGE ROUTE
WarRouter.get('/', function(req, res) {
  res.send("<h1>There's no fighting in the War room</h1>");
});


module.exports = WarRouter;



