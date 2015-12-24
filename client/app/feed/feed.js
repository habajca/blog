angular.module('myApp.feed', ['ngRoute', 'myApp.blogPost', 'myApp.postsApi', 'myApp.login', 'myApp.alerts'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])
.controller('FeedCtrl', ['$scope', 'postsApi', 'login', 'alerts',
  function($scope, postsApi, login, alerts) {
    alerts.refresh();
    if (alerts.getSuccess()) {
      alerts.push({success: "Your post was added to the feed!"});
    }
    postsApi.query().then(function(posts) {
      $scope.posts = posts;
      $scope.$apply();
    });

    var processLoginInfo = function(info) {
      $scope.loginIsReady = true;
      $scope.isLoggedIn = info.authenticated;
    };
    login.getInfo().then(processLoginInfo);
    $scope.logIn = function() {
      $scope.loginIsReady = false;
      login.logIn().then(processLoginInfo);
    };
  }
]);
