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
    
    $scope.onlineMatches = [
      {
        name: "Gara di allenamento",
        key: "32r08u0j2",
        status: 'ended',
        start: new Date()
      },
      {
        name: "Semifinale di Cesenatico",
        key: "f4j0jf2n2",
        status: 'started',
        start: new Date()
      },
      {
        name: 'Finale di Cesenatico',
        key: 'jh8fh4320',
        status: 'not started',
        start: new Date()
      },
      {
        name: "Gara di allenamento",
        key: "32r08u0j2",
        status: 'ended',
        start: new Date()
      },
      {
        name: "Semifinale di Cesenatico",
        key: "f4j0jf2n2",
        status: 'started',
        start: new Date()
      },
      {
        name: 'Finale di Cesenatico',
        key: 'jh8fh4320',
        status: 'not started',
        start: new Date()
      }
    ];
    
    $scope.setMatchKey = function (key) {
      $scope.matchKey = key;
    }
    
    $scope.newAnswer = function () {
      $scope.answers.push('');
    }
    
    $scope.delAnswer = function () {
      if ($scope.answers.length > 1) {
        $scope.answers.splice($scope.answers.length - 1, 1);
      }
    }
    
    $scope.formatDate = function(date) {
      return date.day() + '/' + date.month() + '/' + date.year() + ' ' + date.hours() + ':' + date.minutes();
    }
});
