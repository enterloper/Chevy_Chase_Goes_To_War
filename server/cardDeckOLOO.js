"use strict";
//Write a simple class in the language of your choice to represent a deck of cards with operations to shuffle the deck and to deal one card.

//create Deck 
  //be aware of game in top hierarchy (are we playing War? BlackJack? Uno?)
  //deck should have an origin with just deck as sole property parent in hierarchy
  //deck should have a style or type so the designer team (me,myself,I) can have fun in the future when designing UI.
  //create a shuffle function 

//With Deck Created, we can implement 'special properties' pending the game
  //create a draw one function 'popping off last card' (this sort of falls in the jungle for the banana category but most games feature a draw one behavior so I'm allowing it on a top level)

//Create a War deck!
  //create a takePile function player card is higher than dealer (r.forEach(x => {playerCards.unshift(x)});
  //create a war function (both cards drawn are equal, draw one card face down, and one card face up, winner takes pile.)

/********* OLOO Style *********/
var Deck = {
  cardType: function(cardType = 'standard') {
   this.cardType = cardType;
   return this.cardType;
  },
  orderDeck: function (suits = [ '♥', '♣', '♠', '♦' ], values = [ 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K' ]) {
    let deck = []
    suits.forEach(function(suit) {
      values.forEach(function(value) {
        deck.push(value + suit);
      });
    });
    return deck;  
  },
  shuffleDeck: function (providedDeck) {
    let deck = providedDeck || this.orderDeck();
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
};

var NewDeck = Object.create(Deck);

NewDeck.drawOne = function (deck) {
  var pile = deck || this.deck;
  return pile.pop();
};

module.exports = NewDeck;