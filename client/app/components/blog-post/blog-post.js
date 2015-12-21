angular.module('myApp.blogPost', [])
.directive('myBlogPost', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/blog-post/blog-post.html',
    scope: {
      title: "@postTitle",
      user: "@postUser",
      content: "@postContent"
    }
  }
});
