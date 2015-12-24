angular.module('myApp.login', ['facebook'])
.service('login', ['$q', 'Facebook', function($q, Facebook) {
  var currentPromise = false;
  var cachedInfo = false;
  var cacheInfo = function(info) {
    cachedInfo = info;
    return cachedInfo;
  };
  var getInfo = function() {
    if (cachedInfo) {
      return $q(function(resolve) {
        resolve(cachedInfo);
      });
    } else {
      return currentPromise;
    }
  }
  var logIn = function(loginPromise) {
    cachedInfo = false;
    currentPromise = loginPromise.then(function resolveFacebook(response) {
      if (response.status !== 'connected') {
        return {};
      }
      return $q(function(resolve) {
        var info = {facebook: {creds: response}};
        Facebook.api('/me', function(response) {
          info.facebook.user = response;
          resolve(info);
        })
      });
    }).then(function resolveAws(info) {
      if (!info.facebook) {
        return info;
      }
      return $q(function(resolve, reject) {
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          Logins: {
            'graph.facebook.com': info.facebook.creds.authResponse.accessToken
          },
          IdentityPoolId: 'us-east-1:bb9c4ee2-b780-413a-a53b-72c0991aa289',
          expired: true
        });
        AWS.config.credentials.get(function(err) {
          if (err) {
            return reject(err);
          }
          info.aws = AWS.config.credentials;
          info.authenticated = true;
          resolve(info);
        });
      });
    }).then(cacheInfo);
  }
  logIn($q(function(resolve) {
    Facebook.getLoginStatus(function(result) {
      resolve(result);
    });
  }));
  return {
    logIn: function() {
      return logIn($q(function(resolve) {
        Facebook.login(function(result) {
          resolve(result);
        });
      }));
    },
    getInfo: getInfo
  };
}]);
