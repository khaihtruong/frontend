# quiz-05

In this quiz, you will extend the existing Tweet application by implementing the functionality to delete tweets both on the server and in the UI.

Task Breakdown:

1. Implement a DELETE API Endpoint:
  -	Use the deleteTweet function from tweetService.js to handle the deletion of tweets on the server.
2. Add a Delete Button to the UI:
  -	Each tweet displayed in the UI should have a delete button.
3. Handle DELETE HTTP Requests:
  -	When clicking the delete button, a DELETE HTTP request should be sent to the corresponding API endpoint.
4. Display a Confirmation Prompt:
  -	Before deleting a tweet, show a confirmation message to the user using window.confirm().
5. Error Handling:
  - Display a styled error message to clearly indicate when an error occurs during the delete operation.
  - To test this, you can either stop your API server or intentionally trigger an error by returning an error code from the API.

## Grading Criteria (10 points total)

1. DELETE API Endpoint (3 points):
  - Correctly implements the DELETE endpoint.
  -	Handles success and failure scenarios appropriately.
2. UI Delete Button (3 points):
  -	Each tweet in the UI has a working delete button.
3. Confirmation Prompt (2 points):
  -	Shows a confirmation message before proceeding with the deletion.
4. Error Handling (2 points):
  -	Properly handles errors and displays an error message when a tweet cannot be deleted.
