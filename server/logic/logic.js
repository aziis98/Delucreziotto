// Copyright 2016 Antonio De Lucreziis

var _ = require('underscore');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

require('../logic/header.js');

var Logic = function() {
  var self = this;
  
  this.matches = {};
  this.clock = 0;
  
  this.addMatch = function (match) {
    self.matches[match.key] = match;
  };
  
  this.getMatch = function (key) {
    return self.matches[key];
  };
  
  this.getMatches = function () {
    return self.matches;
  }
  
  setInterval(function () {
    self.emit('update');
  }, 1000);
  
  this.on('update', function () {
    if (self.clock % 60 === 0) { // Minute Update
      _.each(self.matches, function (match) {
        self.emit('updateMatch');
      });
    }
        
    self.clock++;
  });
  
}

util.inherits(Logic, EventEmitter);

function actionAnswerQuestion(time, teamKey, index, answer) {
  return new Action('answer', time, {
    teamKey: teamKey,
    index: index,
    answer: answer
  });
}

function actionSetJolly(time, teamKey, index) {
  return new Action('jolly', time, {
    teamKey: teamKey,
    index: index
  });
}

module.exports = new Logic();
