console.log('Loading query posts event.');

var moment = require('moment');

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context) {
  var tableName = 'SimpleBlogPost';
  var oneWeekAgo = moment().subtract(7, 'days').valueOf();
  var query = {
    TableName: tableName,
    FilterExpression: 'timestampUtc > :oneWeekAgo',
    ExpressionAttributeValues: {
      ':oneWeekAgo': oneWeekAgo
    }
  };
  dynamodb.scan(query, function(err, result) {
    if (err) {
      return context.fail(err);
    }
    context.succeed(result.Items);
  });
}
