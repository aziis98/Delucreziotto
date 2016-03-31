// Copyright 2016 Antonio De Lucreziis

angular.module('gridViewApp', []).controller('gridViewController', function ($scope, $http, $interval) {
  
  var params = getUrlRoutesData();
  
  $scope.matchKey = params[1];
  $scope.teamMode = false;
  
  if (params.length > 2) {
    $scope.teamKey = params[2];
    $scope.teamMode = true;
  }
    
  $scope.updateGrid = function () {
    $http.get('/api/' + $scope.matchKey).then(function (res) {
      $scope.match = res.data;
      if (!$scope.teamMode) {
        $scope.pageTitle = $scope.match.name;
      }
      $scope.grid = generateGrid('simulated', $scope.match);
      $scope.grid.teamArray = _.values($scope.grid.teams);
      updateRemainingTime();
    });
  }
  
  $interval(function () {
    $scope.updateGrid();
  }, 1000);
  
  $scope.sendAnswer = function () {
    $http.post('/api/action', {
      match: $scope.matchKey,
      type: 'answer',
      time: new Date(),
      data: {
        teamKey: $scope.teamKey,
        index: $scope.answerIndex - 1,
        answer: $scope.answerTry
      }
    }).then(function () {
      $scope.updateGrid();
    });
  };
  
  $scope.sendJolly = function () {
    $http.post('/api/action', {
      match: $scope.matchKey,
      type: 'jolly',
      time: new Date(),
      data: {
        teamKey: $scope.teamKey,
        index: $scope.jollyIndex - 1
      }
    }).then(function () {
      $scope.updateGrid();
    });
  };
  
  $scope.formatDate = function (date) {
    return (date || '').toDate().toLocaleString();
  };
  
  $scope.isJollyOf = function (team, index) {
    return team.jolly === index;
  }
  
  var updateRemainingTime = function () {
    var diff = new Date($scope.match.start.toDate().getTime() + $scope.match.options.duration * 60 * 1000 - new Date().getTime());
    $scope.timeFromStart = Math.floor(diff / (60 * 60 * 1000)) + ' ore ' +
                            Math.floor(diff / (60 * 1000)) % 60 + ' min ' +
                            Math.floor(diff / 1000) % 60 + ' s';
  };
  
  var handleServerEvent = function (msg) {
    $scope.$apply(function () {
      var data = JSON.parse(msg.data);
      if (data.message === 'action!') {
        $scope.updateGrid();
      }
      else {
        console.log('Got message from the server:');
        console.log(data);
      }
    });
  }
  
  $scope.updateGrid();
  
  if ($scope.teamMode) {
    $http.get('/api/' + $scope.matchKey + '/' + $scope.teamKey).then(function (res) {
      $scope.team = res.data;
      $scope.pageTitle = $scope.team.name + ' - ' + $scope.match.name;
    });
  }
  
  var source = new EventSource('/api/live');
  source.addEventListener('message', handleServerEvent, false);
});
