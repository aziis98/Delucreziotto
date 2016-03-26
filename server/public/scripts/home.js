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
    
    $scope.testMatchKey = function () {
      $http.get('/api/has/' + $scope.matchKey).then(function (res) {
        $scope.matchKeyValidator = res.data || false;
      })
    }
    
    $scope.testMatchKey();
    
    $scope.createTeam = function () {
      var teamInfo = {
        name: $scope.teamName.trim(),
        match: $scope.matchKey
      };
      
      $http.post('/api/newteam', teamInfo).then(function (res) {
        window.location.href = "/app/" + res.data.matchKey + "/" + res.data.key;
      });
    }
    
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
      var d = new Date(date);
      return format2Digit(d.day()) + '/' + format2Digit(d.month()) + '/' + d.year() + ' ' + format2Digit(d.hours()) + ':' + format2Digit(d.minutes());
    }
    
    function format2Digit(number) {
      if (number < 10) {
        return '0' + number;
      }
      else {
        return number;
      }
    }
});
