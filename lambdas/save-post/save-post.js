console.log('Loading create post event.');

var uuid = require('node-uuid');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context) {
  var tableName = "SimpleBlogPosts";
  var timestamp = new Date().getTime().toString();

  var item = {
    TableName: tableName,
    Item: {
      postId: {
        S: uuid.v4()
      }, 
      timestampUtc: {
        N: timestamp
      },
      title: {
        S: event.title,
      },
      content: {
        S: event.content
      },
      userName: {
        S: event.userName
      },
      userId: {
        S: event.userId
      }
    }
  }
  dynamodb.putItem(item, context.done);
}
