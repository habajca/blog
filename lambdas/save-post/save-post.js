console.log('Loading create post event.');

var uuid = require('node-uuid');
var moment = require('moment');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context) {
  var tableName = "SimpleBlogPost";
  var timestamp = moment().valueOf();

  var item = {
    TableName: tableName,
    Item: {
      postId: uuid.v4(), 
      timestampUtc: timestamp,
      title: event.title,
      content: event.content,
      userName: event.userName,
      userId: event.userId
    }
  }
  dynamodb.put(item, function(err) {
    if (err) {
      return context.fail(err);
    }
    context.succeed({success: true});
  });
}
