'use strict';
let express     = require('express');
let DrawOneRouter = express.Router();


//DrawOne PAGE ROUTE
DrawOneRouter.get('/', function(req, res) {
  res.send("This is where we're drawing one!");
});


module.exports = DrawOneRouter;



