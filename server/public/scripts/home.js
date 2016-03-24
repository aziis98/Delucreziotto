angular.module('homeApp', []).controller('homeController', function ($scope) {
    var params = getParams();
    
    $scope.matchKey = params['match'] || '';
    
    $scope.answers = [ '' ];
    $scope.matchDerive = 1;
    var rDate = new Date();
    rDate.seconds(0);
    rDate.millis(0);
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
