angular.module('myApp.blogPost', ['youtube-embed'])
.directive('myBlogPost', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/blog-post/blog-post.html',
    scope: {
      title: "@postTitle",
      user: "@postUser",
      content: "@postContent"
    },
    controller: ['$scope', function($scope) {
      var decorateContent = function(content) {
        return _.compact(content.split('\n')).map(decorateParagraph);
      };

      var urlRegEx = /(https?:\/\/[^\s]+)/g;
      var decorateParagraph = function(paragraph) {
        return _.compact(paragraph.split(urlRegEx))
        .reduce(function(result, part) {
          if (!part.match(urlRegEx)) {
            result.parts.push({normal: part});
            return result;
          }
          if (isYoutube(part)) {
            result.youtubes.push(part);
          }
          result.parts.push({url: part});
          return result;
        }, {parts:[], youtubes:[]});
      };

      var youtubeRegexes = [
        /https:\/\/www\.youtube\.com\/watch\?v=.*/g,
        /https:\/\/youtu\.be\/.*/g
      ];
      var isYoutube = function(url) {
        for (var i = 0; i < youtubeRegexes.length; i++) {
          if (url.match(youtubeRegexes[i])) {
            return true;
          }
        }
        return false;
      };

      $scope.decoratedContent = decorateContent($scope.content);
    }]
  }
});
