angular.module('myApp.postsApi', [])
.service('postsApi', function() {
  return {
    get: function() {
      return [
        {
          title: 'This is a blog post',
          user: 'a_user',
          tags: ['example', 'first', 'tech', 'demo'],
          content: 'This is a paragraph. It contains multiple sentences, but does not have to. It chooses to.\nThis is another paragraph.'
        }
      ];
    }
  }
});
