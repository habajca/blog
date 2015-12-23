angular.module('myApp.login', ['facebook'])
.service('login', ['Facebook', function(Facebook) {
  var isReady = false;
  var user = false;
  var facebookCallback = function(response) {
    if (response.status === 'connected') {
      Facebook.api('/me', function(response) {
        user = response;
        isReady = true;
      });
    } else {
      user = false;
      isReady = true;
    }
  };
  Facebook.getLoginStatus(facebookCallback);
  return {
    logIn: function() {
      Facebook.login(facebookCallback);
    },
    isReady: function() { return isReady; },
    getUser: function() { return user; }
  };
}]);
