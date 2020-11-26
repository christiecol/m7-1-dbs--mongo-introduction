# Exercise 2.4 - `find()` more than one greeting

1. Create a new async function in `exercise-2.js`.
2. Declare the `client`
3. Connect to the client, etc.
4. Declare the `db`. \_We're still using `exercise_1`.
5. Use `.find()` to get back _all_ of the documents in the 'greetings' collection.
6. Use the `.toArray()`.
7. Be sure to `res`pond appropriately. `find` will return an empty array if it doesn't find anything...
8. Create a new endpoint: `.get('/ex-2/greeting', getGreetings)`
9. Call this enpoint from Insomnia. It should return _all_ of the documents in the collection.

Using `.find()` without passing anything to it will return _all_ of the documents in the collection.

It really isn't good practice to return _all_ of the data. What would happen if there were thousands of documents in the collection? 💥

10. Instead let's setup some limits. If a user makes a query like we did just above, they will get only the first 25 documents.

    - Use [`.slice()`](https://www.w3schools.com/jsref/jsref_slice_array.asp).
    - We will also need to remove the ternary operator and use a proper `if/else` statement.

11. This is better, but we need to allow user to be able to access all of the data.
12. If a user were to query our server with this `/ex-2/greeting?start=10&limit=10`, they would receive the 10th to the 20th values. Make this possible in your function.
    - There should also be fallback values if they only provide ony one of the query params, even none...
13. Finally, if the user requests a range that doesn't exist, is incomplete, we need to handle that. For example, if there are 100 documents, but they ask for `start=90&limit=20`, they should only receive the last 10 and nothing else.

### Stretch goal

Once you've implemented all of 2.4, everything works, but the user might not know if their query was good or not. We could provide them with some additional data in the response to let them know what the received in regards to the data.

For example, if there are only 12 values, but the query is `start=10&limit=5`. We should let the user know that we changed his/her query.

```js
{
  "status": 200,
  "start": 10,
  "limit": 2,
  "data": [
    {
      "_id": "HI",
      "lang": "Hindi",
      "hello": "Namaste"
    },
    {
      "_id": "HU",
      "lang": "Hungarian"
    }
  ]
}
```
