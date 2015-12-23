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
    $scope.posts = postsApi.query();

    $scope.logIn = login.logIn;
    $scope.loginIsReady = login.isReady();
    $scope.user = login.getUser();
    $scope.isLoggedIn = !!$scope.user;
    $scope.$watch(function() {
      return login.isReady();
    }, function(newLoginIsReady) {
      $scope.loginIsReady = newLoginIsReady;
    });
    $scope.$watch(function() {
      return login.getUser();
    }, function(newUser) {
      $scope.user = newUser;
      $scope.isLoggedIn = !!newUser;
    });
  }
]);
