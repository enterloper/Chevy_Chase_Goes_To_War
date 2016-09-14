'use strict';
let chai        = require('chai');
let expect      = chai.expect;
let should      = chai.should();
let assert      = chai.assert;
let NewDeck     = require('./../server/cardDeckClass.js');
/*after running standard.drawOne() 3 times;
(function (a,b,c) {
  for(let i = 0, max = standard.deck.length, deck=standard.deck; i<max; i++){
    if(deck[i]===a||deck[i]===b||deck[i]===c) {
      return "RU ROOOOO";
    }
  }return 'All Clear!';
}("9♥","2♣","4♥"));
*/
var standard = new NewDeck();

//IMPLIMENT!!!! BOOOOOOOI!
// .to.deep.equal({ bar: 'baz' });
// expect({ foo: { bar: { baz: 'quux' } } })
//   .to.have.deep.property('foo.bar.baz', 'quux');
//USE BEFOREEACH!before(), after(), beforeEach(), and afterEach()

describe('Completed deck', () => {
  it('should have a 52 cards in total', () => {
    expect( standard.deck ).to.have.length(52);
  });
});

describe('shuffleDeck', function() {
  it('should exist', function(){
    should.exist(standard.shuffleDeck);
  });

  it('should be a function', function() {
    standard.shuffleDeck.should.be.a.Function;
  });

  it('should return an array', function() {
    var result = standard.shuffleDeck(standard.deck);
    should.exist(result);
    result.should.be.an.instanceof(Array);
  });

  it('should return an array with every card in the deck', function(){
    var input = standard.orderDeck();
    var control = standard.orderDeck();
    var result = standard.shuffleDeck(input);
    // check that every expected card is in the result deck
    for (var i = 0; i < control.length; i++) {
      result.should.contain(control[i]);
    }
    // check that no unexpected cards are in the result deck
    for (var i = 0; i < result.length; i++) {
      control.should.contain(result[i]);
    }
  });

  it('should not return the deck in input order', function(){
    var input = standard.deck;
    var control = standard.orderDeck();
    var result = standard.shuffleDeck(input);
    // check that all cards are not present in the same order
    result.should.not.eql(control);
  });

  it('should not return the deck in the same order twice', function(){
    var input1  = standard.orderDeck();
    var input2  = standard.orderDeck();
    var result1 = standard.shuffleDeck(input1);
    var result2 = standard.shuffleDeck(input2);

    // check that all cards are not present in the same order
    result1.should.not.eql(result2);
  });

  it('should not have any bias from a uniform distribution', function () {
    var deck = standard.orderDeck();
    // Keep a table of how often each card appears in each deck position...
    var cardPositionCounts = {};
    for (var i = 0; i < deck.length; i++) {
      var cardPosition = cardPositionCounts[deck[i]] = {};
      for (var j = 0; j < deck.length; j++) {
        cardPosition[j] = 0;
      }
    }
    // five hundred shuffles
    var iterations = 52 * 10;
    for (var i = 0; i < iterations; i++) {
      deck = standard.orderDeck();
      var randomDeck = standard.shuffleDeck(deck);
      for (var j = 0; j < randomDeck.length; j++) {
        cardPositionCounts[randomDeck[j]][j] += 1;
      }
    }
    // The result should not betray any obvious statistical bias.
    deck = standard.orderDeck();
    // The expected number of occurrences for a particular card in a particular index is
    // iterations/52 = 10
    var expected = 10,
      chi2 = 0;
    for (var i = 0; i < deck.length; i++) {
      var cardPosition = cardPositionCounts[deck[i]];
      for (var j = 0; j < deck.length; j++) {
        // calculate chi-squared test
        chi2 += Math.pow(cardPosition[j] - expected, 2) / expected;
      }
    }
    // quick and dirty statistical test:
    // if your shuffles are uniformly distributed, chi-squared should be roughly 52^2
    var target = 52*52;
    var margin = 52*10;
    chi2.should.be.within(target - margin, target + margin);
    return chi2;
  });

  it('for large N, should not have any bias from a uniform distribution', function () {
    // Perform this test on an array of 1000 integers.
    // Function must shuffle an arbitrary array to pass this test.
    // Must run in Linear Time
    var orderedArray = function () {
      var output = [];
      for (var i = 0; i < 1000; i++) {
        output.push(i);
      }
      return output;
    };
    var deck = orderedArray();
    // Keep a table of how often each integer appears in each array position...
    var cardPositionCounts = {};
    for (var i = 0; i < deck.length; i++) {
      var cardPosition = cardPositionCounts[deck[i]] = {};
      for (var j = 0; j < deck.length; j++) {
        cardPosition[j] = 0;
      }
    }
    // ...over the course of five thousand shuffles
    var iterations = 1000 * 5;
    for (var i = 0; i < iterations; i++) {
      deck = orderedArray();
      var randomDeck = standard.shuffleDeck(deck);
      for (var j = 0; j < randomDeck.length; j++) {
        cardPositionCounts[randomDeck[j]][j] += 1;
      }
    }
    // The result should not betray any obvious statistical bias.
    deck = orderedArray();
    // The expected number of occurrences for a particular card in a particular index is
    // iterations/1000 = 1
    var expected = 5,
      chi2 = 0;
    for (var i = 0; i < deck.length; i++) {
      var cardPosition = cardPositionCounts[deck[i]];
      for (var j = 0; j < deck.length; j++) {
        // calculate chi-squared test
        chi2 += Math.pow(cardPosition[j] - expected, 2) / expected;
      }
    }
    // quick and dirty statistical test:
    // chi-squared should be roughly 1000^2
    var target = 1000*1000;
    var margin = 1000*10;
    chi2.should.be.within(target - margin, target + margin);
  });
});