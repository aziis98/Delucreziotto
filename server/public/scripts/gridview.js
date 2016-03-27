// Copyright 2016 Antonio De Lucreziis

angular.module('gridViewApp', []).controller('gridViewController', function ($scope, $http, $interval) {
  
  var params = getUrlRoutesData();
  
  $scope.matchKey = params[1];
  $scope.viewType = 'match';
  
  if (params.length > 2) {
    $scope.teamKey = params[2];
    $scope.viewType = 'team';
  }
  
  if ($scope.viewType === 'team') {
    $http.get('/api/' + $scope.matchKey + '/' + $scope.teamKey).then(function (res) {
      $scope.team = res.data;
    });
  }
  
  $scope.updateGrid = function () {
    $http.get('/api/' + $scope.matchKey).then(function (res) {
      $scope.match = res.data;
      $scope.grid = generateGrid('simulated', $scope.match);
      timeFromStart();
    });
  }
  
  $interval(function () {
    $scope.updateGrid();
  }, 10000);
  
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
    return date.toDate().toLocaleString();
  };
  
  $scope.isJollyOf = function (team, index) {
    return team.jolly === index;
  }
  
  var timeFromStart = function () {
    var diff = new Date() - $scope.match.start.toDate();
    $scope.timeFromStart = Math.floor(diff / (60 * 60 * 1000)) + ' ore ' + Math.floor(diff / (60 * 1000)) % 60 + ' min ' + Math.floor(diff / 1000) % 60 + ' s';
  };
  
  $scope.updateGrid();
  
});
