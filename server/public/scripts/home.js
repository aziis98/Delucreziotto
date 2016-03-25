angular.module('homeApp', []).controller('homeController', function ($scope, $http) {
    var params = getParams();
    
    $scope.matchKey = params['match'] || '';
    
    $scope.answers = [ '' ];
    $scope.matchDerive = 1;
    var rDate = new Date();
    rDate.seconds(0);
    rDate.millis(0);
    $scope.matchStartDatetime = rDate;
    $scope.matchDuration = 120;
    
    $scope.onlineMatches = [];
    
    $http.get('/api/list').then(function (res) {
      _.each(res.data, function (match) {
        $scope.onlineMatches.push(match);
      })
    });
    
    $scope.createMatch = function () {
      var matchInfo = {
        name: $scope.matchName,
        answers: $scope.answers,
        startTime: $scope.matchStartDatetime,
        options: {
          derive: $scope.matchDerive,
          duration: $scope.matchDuration
        }
      };
      
      $http.post('/api/newmatch', matchInfo).then(function (res) {
        $scope.matchinfo = res.data;
      });
    }
    
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
