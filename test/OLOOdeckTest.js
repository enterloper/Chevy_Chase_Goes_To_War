'use strict';
let chai        = require('chai');
let expect      = chai.expect;
let should      = chai.should();
let assert      = chai.assert;
let NewDeck     = require('./../server/cardDeckOLOO.js');

var standard =  Object.create(NewDeck);
standard.deck = standard.orderDeck();

describe('Completed deck', () => {
  it('should have a 52 cards in total', () => {
    expect( standard.deck ).to.have.length(52);
  });
});

describe('shuffleDeck behavior', () => {
  it('should exist', () => {
    should.exist(standard.shuffleDeck);
  });

  it('should be a function', () => {
    standard.shuffleDeck.should.be.a.Function;
  });

  it('should return an array', () => {
    var result = standard.shuffleDeck(standard.orderDeck());
    should.exist(result);
    result.should.be.an.instanceof(Array);
  });

  it('should return an array with every card in the deck', () => {
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

  it('should not return the deck in input order', () => {
    var input = standard.orderDeck();
    var control = standard.orderDeck();
    var result = standard.shuffleDeck(input);
    // check that all cards are not present in the same order
    result.should.not.eql(control);
  });

  it('should not return the deck in the same order twice', () => {
    var input1 = standard.orderDeck();
    var input2 = standard.orderDeck();
    var result1 = standard.shuffleDeck(input1);
    var result2 = standard.shuffleDeck(input2);

    // check that all cards are not present in the same order
    result1.should.not.eql(result2);
  });

  it('should not have any bias from a uniform distribution', () => {
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
    var orderedArray = () => {
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

describe('drawOne behavior', function () {
  console.log('155--------------->', standard.deck.length);

  beforeEach(function() {
    standard =  Object.create(NewDeck);
    standard.deck = standard.orderDeck();
  });

  it('should exist', function() {
    should.exist(standard.drawOne);
  });

  it('should be a function', function() {
    standard.drawOne.should.be.a.Function;
  });
  
  it('should return a string', function() {
    var result = standard.drawOne(standard.deck);
    should.exist(result);
    result.should.be.a.String;
  });

  it('should decrease the deck by a value of one', function() {
    var initial = standard.deck.length;
    standard.drawOne();
    expect( standard.deck ).to.have.length(initial-1);
  });

  it('should draw the last card in the deck', function() {
    var candidate = standard.deck[standard.deck.length-1];
    var drawn = standard.drawOne();
    expect(candidate).to.equal(drawn);
  });

  it('should draw one through the entirety of the deck', function() {
    var fifty_third;
    for(let i=0, max=standard.deck.length; i<=max; i++){
      if(i=max) {
        fifty_third = standard.deck[i];
      }
      standard.drawOne();
    }
    expect(fifty_third).to.be.undefined;
  });
  
  it('should draw one through the entirety of the deck', function() {
    var last_card;
    var temp;
    console.log('198--------------->', standard.deck.length);
    
    for(let i=standard.deck.length-1; i>=0; i--){
      console.log('------------->i',standard.deck[i]);
      temp = standard.drawOne();
      console.log('------------->temp',temp);
      if(i === 0) {
        last_card = temp;
      }
    }
    console.log('206--------------->', last_card);

    expect(last_card).to.not.be.undefined;
  });
});  

