'use strict';

angular.module('myApp.feed', ['ngRoute', 'myApp.blogPost', 'myApp.postsApi'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])

.controller('FeedCtrl', ['$scope', 'postsApi', function($scope, postsApi) {
  $scope.posts = postsApi.get();
}]);
