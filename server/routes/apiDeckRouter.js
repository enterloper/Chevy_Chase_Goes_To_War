'use strict';
let express     = require('express');
let apiDeckRouter = express.Router();

/*

const shuffleDeck = (deck) => {

  let key, temp;
  for(let i = 0; i<2; i++){
    for (let j = 0; j < deck.length; j++) {
      key = Math.floor(Math.random() * deck.length);
      temp = deck[j];
      deck[j] = deck[key];
      deck[key] = temp;
    }
  }
  return deck;
}

*/


apiDeckRouter.get('/newDeck', function(req, res){
  res.send('fire off the new deck!')
});

module.exports = apiDeckRouter;

