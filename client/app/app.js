'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'facebook',
  'myApp.feed',
  'myApp.newPost'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/feed'});
}])
.config(['FacebookProvider', function(FacebookProvider) {
  FacebookProvider.init('816900375088906');
}]);
