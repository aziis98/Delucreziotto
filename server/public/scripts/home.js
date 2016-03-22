angular.module('homeApp', []).controller('homeController', function () {
    var home = this;
    var params = getParams();
    
    home.matchKey = params['match'] || '';
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
