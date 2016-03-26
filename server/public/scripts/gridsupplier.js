var answerBonus = [20, 15, 10, 8, 6, 5, 4, 3, 2, 1];

var gridSupplier = {
  'default': function (match) {
    var time = new Date(); // Now
    var answers = {};
    
    _.each(match.actions, action => {
      action.time = new Date(action.time);
    });
    
    var sortedActions = _.sortBy(match.actions, action => action.time);
    
    for (var i = 0; i < match.answers.length; i++) {
      answers[i] = calcAnswerScoreAt(match, i, time);
    }
    
    var teams = _.mapObject(match.teams, team => ({
      name: team.name,
      score: match.answers.length * 10,
      answers: listArray(match.answers.length, i => 0)
    }));
        
    _.each(sortedActions, function (action) {
      if (action.type === 'answer' && action.time < time) {
        var team = teams[action.data.teamKey];
        
        if (action.data.answer == match.answers[action.data.index]) {
          // Correct
          var scoreData = calcAnswerScoreAt(match, i, new Date(action.time - 100));
          var score = scoreData.score + answerBonus[scoreData.correctCount];
          
          team.score += score;
          team.answers[action.data.index] = score;
        }
        else {
          // Wrong
          team.score -= 10;
          team.answers[action.data.index] -= 10;
        }
      }
    });
        
    return {
      answers: answers,
      teams: teams
    }
  }
  ,
  'simulated': function (match) {
    
    
    return {
      answers: null,
      teams: null
    }
  }
};

function generateGrid(generatorName, match) {
  return gridSupplier[generatorName](match);
}

function calcAnswerScoreAt(match, index, time) {
  console.log('calcAnswerScoreAt(match, ' + index + ', ' + time +')');
  var correctAnswer = match.answers[index];
  
  var answerAction = _.filter(match.actions, function (action) {
    return action.time <= time && action.type === 'answer' && action.data.index === index;
  });
  
  answerAction = _.sortBy(answerAction, action => action.time)
    
  var score = 20;
  var previousTime = new Date(match.start);
  var correctCount = 0;
  console.log(score);
  _.each(answerAction, function (action) {
    console.log('action');
    if (correctCount < match.options.derive) {
      var dt = minuteDifference(action.time, match.options.answerIncreaseStopTime.toDate());
      
      if (time < match.options.answerIncreaseStopTime.toDate()) {
        score += minuteDifference(previousTime, action.time);
      }
      else if (dt > 0) {
        score += dt;
      }
    }
    console.log(score);
    previousTime = action.time;
    
    if (action.data.answer == correctAnswer) {
      correctCount++;
    }
    else {
      score += 2;
    }
    console.log(score);
  });
  
  var dt = minuteDifference(previousTime, match.options.answerIncreaseStopTime.toDate());
  
  if (time < match.options.answerIncreaseStopTime.toDate()) {
    score += minuteDifference(previousTime, time);
  }
  else if (dt > 0) {
    score += dt;
  }
  
  console.log(score);
  console.log('end');
  
  return {
    score: score,
    correctCount: correctCount
  };
}

function minuteDifference(time1, time2) {
  return Math.floor((time2 - time1) / 60000);
}












/*
Expected Structure from a gridSupplier:

var exampleGrid = {
  answers: {
    '0': {
      score: 12
    },
    '1': {
      score: 12
    },
    '2': {
      score: 12
    },
    '3': {
      score: 12
    },
    '4': {
      score: 12
    },
    '5': {
      score: 12
    }
  },
  teams: {
    'Ffc55b9Rld': {
      score: 300,
      answers: [0,0,0,0,0,0]
    },
    'P3dL69iGlL': {
      score: 300,
      answers: [0,0,0,0,0,0]
    },
    'fXvmUyyd6w': {
      score: 300,
      answers: [0,0,0,0,0,0]
    }
  }
};

*/
