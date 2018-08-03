import * as dynamoDbLib from "./lib/dynamodb-lib";
import { success, failure } from "./lib/response-lib";

export async function main(event, context, callback) {
  console.log('event', event)
  console.log('callback', callback)
  console.log('process.env', process.env)

  // function getId() {

  // }

    const params = {
      TableName: "dev-learningObjectives",
      // value for TableName above:   process.env.tableName

      // 'KeyConditionExpression' defines the condition for the query
      // - 'userId = :userId': only return items with matching 'userId'
      //   partition key
      // 'ExpressionAttributeValues' defines the value in the condition
      // - ':userId': defines 'userId' to be Identity Pool identity id
      //   of the authenticated user
      KeyConditionExpression: "learningObjective = :learningObjective",
      ExpressionAttributeValues: {
        ":learningObjective": "1"
      }
    };
  
    try {
      const result = await dynamoDbLib.call("query", params);
      // Return the matching list of items in response body
      callback(null, success(result.Items));
    } catch (e) {
      console.log('E::',e);
      callback(null, failure({ status: false }));
    }
  }

