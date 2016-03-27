// Copyright 2016 Antonio De Lucreziis

angular.module('adminPanel', []).controller('ctrlAdminPanel', function ($scope, $http, $interval) {
  var params = getParams();
  
  $scope.authenticationError = true;
  
  $http.get('/api/' + params.match).then(function (res) {
    if (params.pass == res.data.adminKey) {
      $scope.match = res.data;
      $scope.authenticationError = false;
    }
  });
  
  $interval(function () {
    $http.get('/api/' + params.match).then(function (res) {
        $scope.match = res.data;
    });
  }, 2500);
  
  $scope.formatJSON = function (obj) {
    return JSON.stringify(obj, undefined, 2);
  };
  
})
