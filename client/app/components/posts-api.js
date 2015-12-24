angular.module('myApp.postsApi', ['myApp.login'])
.service('postsApi', ['$q', 'login', function($q, login) {
  var queryClient = apigClientFactory.newClient();
  var saveClient = false;
  var getSaveClient = function() {
    if (!saveClient) {
      return login.getInfo().then(function(info) {
        return apigClientFactory.newClient({
          accessKey: info.aws.accessKeyId,
          secretKey: info.aws.secretAccessKey,
          sessionToken: info.aws.sessionToken
        });
      });
    }
    return $q(function() { return saveClient });
  }
  return {
    query: function() {
      return queryClient.postsGet({}, {}, {}).then(function(response) {
        return response.data;
      });
    },
    save: function(post) {
      return getSaveClient().then(function(saveClient) {
        return saveClient.postsPost({}, post, {})
      });
    }
  }
}]);
