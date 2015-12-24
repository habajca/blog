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
    login.getInfo().then(function(info) {
      if (!info.authenticated) {
        $location.path('/feed');
      } else {
        $scope.post = { userName: info.facebook.user.name, userId: info.facebook.user.id };
        $scope.ready = true;
      }
    });

    $scope.postPending = false;
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
      $scope.postPending = true;
      alerts.refresh();
      postsApi.save($scope.post).then(function(response) {
        $location.path('/feed');
        alerts.success()
      });
    };
    $scope.reEdit = function() {
      alerts.refresh();
      $scope.isPreviewOpen = false;
    };
  }
]);
