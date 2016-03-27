// Copyright 2016 Antonio De Lucreziis

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
    console.log('\n\n\nSimulating Grid...');
    var minutesFromStart = minuteDifference(match.start.toDate(), new Date());
    var limit100th = match.options.answerIncreaseStopTime.toDate();
    console.log(minutesFromStart);
    
    var answerCount = match.answers.length;
    
    var answers = listArray(answerCount, i => ({
      score: 20,
      correctCount: 0,
      braveTeams: []
    }));
    
    var teams = _.mapObject(match.teams, team => ({
      name: team.name,
      score: answerCount * 10,
      answers: listArray(answerCount, i => 0),
      jolly: -1
    }));
    
    var deriveStop = listArray(answerCount, i => false);
    var sortedActions = _.sortBy(match.actions, action => action.time.toDate());
    
    for (var m = 1; m <= minutesFromStart; m++) {
      var simTime = new Date(match.start.toDate().getTime() + 1000 * 60 * m);
      var endOfMinuteTime = new Date(simTime.getTime());
      simTime.seconds(0);
      endOfMinuteTime.seconds(59);
      
      if (m === 10) {
        _.each(teams, function (team) {
          if (team.jolly === -1) {
            team.jolly = 0;
          }
        })
      }
      
      // Updates each answer score
      for (var i = 0; i < answerCount; i++) {
        
        if (!deriveStop[i] && m <= 100) {
          answers[i].score += 1;
          _.each(answers[i].braveTeams, function (teamKey) {
            var jollyFactor = 1;
            if (teams[teamKey].jolly === actionData.index) {
              jollyFactor = 2;
            }
            
            teams[teamKey].score += 1 * jollyFactor;
            teams[teamKey].answers[i] += 1 * jollyFactor;
          })
        }
      }
      
      if (sortedActions.length > 0) {
        
        var currentAction = _.first(sortedActions);
        
        while (currentAction != undefined && currentAction.time.toDate() < endOfMinuteTime) {
          sortedActions = _.tail(sortedActions);
          console.log(currentAction);
          
          if (currentAction.type === 'jolly') {
            teams[currentAction.data.teamKey].jolly = currentAction.data.index;
          }
          
          if (currentAction.type === 'answer') {
            var actionData = currentAction.data;
            var answerData = answers[actionData.index];
            
            var jollyFactor = 1;
            if (teams[actionData.teamKey].jolly == actionData.index) {
              jollyFactor = 2;
            }
            
            if (actionData.answer == match.answers[actionData.index]) {
              var gainScore = answerData.score + answerBonus[answerData.correctCount]
              
              teams[actionData.teamKey].score += gainScore * jollyFactor;
              teams[actionData.teamKey].answers[actionData.index] = gainScore * jollyFactor;
              answerData.correctAnswer++;
              answerData.braveTeams.push(actionData.teamKey);
            }
            else {
              teams[actionData.teamKey].score -= 10 * jollyFactor;
              teams[actionData.teamKey].answers[actionData.index] -= 10 * jollyFactor;
              answers[actionData.index].score += 2;
            }
          }
          
          currentAction = _.first(sortedActions);
        }
        
      }
      
      
    }
    
    return {
      answers: answers,
      teams: teams
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
