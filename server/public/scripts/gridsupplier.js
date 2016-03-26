var gridSupplier = {
  'default': function (match) {
    
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

/*
Expected Structure from a gridSupplier:
*/

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
