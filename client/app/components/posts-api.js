angular.module('myApp.postsApi', [])
.service('postsApi', function() {
  var posts = []
  return {
    query: function() {
      return posts;
    },
    save: function(post, cb) {
      posts = [post].concat(posts);
      cb();
    }
  }
});
