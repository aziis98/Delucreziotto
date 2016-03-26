angular.module('gridViewApp', []).controller('gridViewController', function ($scope, $http, $interval) {
  
  var params = getUrlRoutesData();
  
  $scope.matchKey = params[1];
  $scope.viewType = 'match';
  
  if (params.length > 2) {
    $scope.teamKey = params[2];
    $scope.viewType = 'team';
  }
  
  $http.get('/api/' + $scope.matchKey).then(function (res) {
    $scope.match = res.data;
    $scope.updateGrid();
  });
  
  if ($scope.viewType === 'team') {
    $http.get('/api/' + $scope.matchKey + '/' + $scope.teamKey).then(function (res) {
      $scope.team = res.data;
    });
  }
  
  $interval(function () {
    $scope.updateGrid();
  }, 10000);
  
  $scope.updateGrid = function () {
    $scope.grid = generateGrid('default', $scope.match);
  }
  
  $scope.sendAnswer = function () {
    $http.post('/api/action', {
      type: 'answer',
      time: new Date(),
      data: {
        teamKey: $scope.teamKey,
        index: $scope.answerIndex,
        answer: $scope.answerTry
      }
    }).then(function () {
      $scope.updateGrid();
    })
  };
  
});
