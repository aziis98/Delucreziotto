var answerBonus = [20, 15, 10, 8, 6, 5, 4, 3, 2, 1];

var gridSupplier = {
  'default': function (match) {
    var time = new Date(); // Now
    var answers = {};
    
    for (var i = 0; i < match.answers.length; i++) {
      answers[i] = calcAnswerScoreAt(match, i, time);
    }
    
    return {
      answers: answers,
      teams: _.map(match.teams, team => ({
        name: team.name,
        score: 300,
        answers: listArray(match.answers.length, i => 0)
      }))
    }
  },
  'debug': function (match) {
    return {
      answers: listObject(match.answers.length, i => ({
        score: 20
      })),
      teams: _.map(match.teams, team => ({
        name: team.name,
        score: 300,
        answers: listArray(match.answers.length, i => 0)
      }))
    }
  }
};

function generateGrid(generatorName, match) {
  return gridSupplier[generatorName](match);
}

function calcAnswerScoreAt(match, index, time) {
  var correctAnswer = match.answers[index];
  
  var specificAnswers = _.filter(match.actions, function (action) {
    return action.time <= time && action.type === 'answer' && action.data.index === index;
  });
  
  specificAnswers = _.sortBy(specificAnswers, action => action.time)
  
  console.log(specificAnswers);
  
  var score = 20;
  var previousTime = new Date(match.start);
  var correctCount = 0;
  
  _.each(specificAnswers, function (action) {
    if (correctCount < match.options.derive) {
      score += minuteDifference(previousTime, action.time);
    }
    
    previousTime = action.time;
    
    if (action.data.answer == correctAnswer) {
      correctCount++;
    }
    else {
      score += 2;
    }
  });
  
  score += minuteDifference(previousTime, time);
  
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
