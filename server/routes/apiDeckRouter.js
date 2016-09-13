'use strict';
let express     = require('express');
let apiDeckRouter = express.Router();

apiDeckRouter.get('/newDeck', function(req, res){
  res.send('fire off the new deck!')
});

module.exports = apiDeckRouter;

