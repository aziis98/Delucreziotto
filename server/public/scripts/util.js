
function getUrlRoutesData() {
  return window.location.pathname.split('/').filter(function (str) {
    return str.length > 0;
  });
}

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

// Date Getter/Setters
Date.prototype.millis = function (newMillis) {
  return arguments.length == 0 ? this.getMilliseconds() : (this.setMilliseconds(newMillis));
};

Date.prototype.seconds = function (newSeconds) {
  return arguments.length == 0 ? this.getSeconds() : (this.setSeconds(newSeconds));
};

Date.prototype.minutes = function (newMinutes) {
  return arguments.length == 0 ? this.getMinutes() : (this.setMinutes(newMinutes));
};

Date.prototype.hours = function (newHours) {
  return arguments.length == 0 ? this.getHours() : (this.setHours(newHours));
};

Date.prototype.day = function (newDay) {
  return arguments.length == 0 ? this.getDay() : (this.setDate(newDay));
};

Date.prototype.month = function (newMonth) {
  return arguments.length == 0 ? this.getMonth() : (this.setMonth(newMonth));
};

Date.prototype.year = function (newYear) {
  return arguments.length == 0 ? this.getFullYear() : (this.setFullYear(newYear));
};
