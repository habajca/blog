angular.module('myApp.newPost', ['ngRoute', 'myApp.blogPost', 'myApp.postsApi', 'myApp.login', 'myApp.alerts'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new-post', {
    templateUrl: 'new-post/new-post.html',
    controller: 'NewPostCtrl'
  });
}])
.controller('NewPostCtrl', ['$scope', '$location', 'postsApi', 'login', 'alerts',
  function($scope, $location, postsApi, login, alerts) {
    alerts.refresh();
    if (!login.getUser()) {
      $location.path('/feed');
      return;
    }

    $scope.post = { user: login.getUser().name };

    $scope.isPreviewOpen = false;
    $scope.openPreview = function() {
      alerts.refresh();
      var valid = true
      if (!$scope.post.title) {
        alerts.push({error: 'Title is required.'});
        valid = false;
      }
      if (!$scope.post.content) {
        alerts.push({error: 'Content is required.'});
        valid = false;
      }
      if (valid) {
        alerts.push({info: 'Looks good? Add it to the feed!'});
        $scope.isPreviewOpen = true;
      }
    };

    $scope.addPost = function() {
      alerts.refresh();
      postsApi.save($scope.post, function() {
        $location.path('/feed');
        alerts.success();
      });
    };
    $scope.reEdit = function() {
      alerts.refresh();
      $scope.isPreviewOpen = false;
    };
  }
]);
