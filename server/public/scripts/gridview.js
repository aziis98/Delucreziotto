angular.module('gridViewApp', []).controller('gridViewController', function ($scope, $http) {
  
  var params = getUrlRoutesData();
  
  $scope.matchKey = params[1];
  $scope.viewType = 'match';
  
  if (params.length > 2) {
    $scope.teamKey = params[2];
    $scope.viewType = 'team';
  }
  
  $http.get('/api/' + $scope.matchKey).then(function (res) {
    $scope.match = res.data;
  });
  
  if ($scope.viewType === 'team') {
    $http.get('/api/' + $scope.matchKey + '/' + $scope.teamKey).then(function (res) {
      $scope.team = res.data;
    });
  }
  
});
