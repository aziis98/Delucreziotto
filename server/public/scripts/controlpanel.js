angular.module('adminPanel', []).controller('ctrlAdminPanel', function ($scope) {
  var params = getParams();
  
  $scope.matchInfo = {
    matchKey: params.match,
    matchPass: params.pass
  }
})
