var _ = require('underscore');

var matches = {};

var clock = 0;

function updateMatch(match) {
  
}

exports.addMatch = function (match) {
  matches[match.key] = match;
};

exports.getMatches = function () {
  return matches;
};

exports.update = function () {
  
  if (clock % 60 === 0) { // Minute Update
    _.each(matches, updateMatch);
  }
  
  clock++;
};

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
