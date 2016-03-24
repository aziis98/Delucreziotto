angular.module('homeApp', []).controller('homeController', function ($scope) {
    var params = getParams();
    
    $scope.matchKey = params['match'] || '';
    
    $scope.answers = [ '' ];
    $scope.matchDerive = 1;
    var rDate = new Date();
    rDate.setSeconds(0);
    rDate.setMilliseconds(0);
    $scope.matchStartDatetime = rDate;
    $scope.matchDuration = 120;
    
    $scope.newAnswer = function () {
      $scope.answers.push('');
    }
    
    $scope.delAnswer = function () {
      if ($scope.answers.length > 1) {
        $scope.answers.splice($scope.answers.length - 1, 1);
      }
    }
});

function getParams() {
  var params = {};
  var query = document.location.search.substring(1); // removes the pending '?'
  var pairs = query.split('&');
  pairs.forEach(function (pair) {
    pair = pair.split('=');
    params[pair[0]] = pair[1];
  });
  return params;
}
