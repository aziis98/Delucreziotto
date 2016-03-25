// Copyright 2016 Antonio De Lucreziis

var keygen = require('./keygen.js');

Match = function(name, answers, start, options) {
  this.key = keygen.generate(10);
  this.adminKey = keygen.generate(10);
  
  this.name = name;
  this.start = start;
  this.answers = answers;
  
  this.teams = {};
  this.actions = {};
  
  this.options = options;
};

Match.prototype.addTeam = function (team) {
  this.teams[team.key] = team;
};

Match.prototype.getTeam = function (key) {
  return this.teams[key];
};

Match.prototype.addAction = function (action) {
  this.actions[action.key] = action;
};

Match.prototype.removeAction = function (key) {
  this.actions = this.actions.filter(function (action) {
    return action.key != key;
  })
}


Team = function(name) {
  this.key = keygen.generate(10);
  
  this.name = name;
};

Action = function(type, time, data) {
  this.key = keygen.generate(10);
  
  this.type = type;
  this.time = time;
  this.data = data;
};
