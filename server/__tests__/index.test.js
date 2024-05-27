const request = require('supertest');
const app = require('../index'); // Adjust the path if necessary

describe('Express App', () => {
  let server;

  beforeAll(() => {
    server = app.listen(4000); // Start the server on a specific port
  });
  
  afterAll((done) => {
    server.close(done); // Close the server after all tests are done
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/create_user')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('usertype');
  });

  it('should add a new item', async () => {
    const res = await request(app)
      .post('/addItem')
      .send({
        author: 'Author Name',
        title: 'Book Title',
        isbn: '1234567890',
        category: 'Category',
        publisher: 'Publisher Name',
        year: 2023,
        copies: 10
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.text).toEqual('Item added successfully');
  });

  it('should update an existing item', async () => {
    const updatedItemData = {
      id: 155,
      author: 'Justin',
      title: 'Apex',
      isbn: '1234567890',
      category: 'Category',
      publisher: 'Publisher Name',
      year: 2023,
      copies: 10
    };

    const response = await request(app)
      .patch('/updateItem')
      .send(updatedItemData);

    expect(response.statusCode).toBe(200);

    expect(response.text).toEqual('Item updated successfully');
});

it('should delete an item', async () => {
  // Mock data for the item to be deleted
  const itemIdToDelete = 155; // Provide the ID of the item to be deleted
  
  // Send a request to delete the item
  const res = await request(app)
    .delete('/deleteItem')
    .send({ id: itemIdToDelete });

  // Assert the response status code and message
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('message', 'Item deleted successfully');
});

it('should fetch items with pagination', async () => {
  const res = await request(app)
    .get('/items');

  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeDefined(); 
});

it('should fetch items from a specific page', async () => {
  const pageToFetch = 2;
  const res = await request(app)
    .get(`/items?page=${pageToFetch}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeDefined(); // Assuming the response contains data
  // Add more specific assertions based on the expected structure of the response data
});

it('should search for books based on search query and category', async () => {
  // Define search query and category
  const searchQuery = 'Harry Potter'; // Example search query
  const category = 'Fantasy'; // Example category

  // Send a request to search for books
  const res = await request(app)
    .get(`/search?search=${searchQuery}&category=${category}`);

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeDefined(); // Assuming the response contains data
  // Add more specific assertions based on the expected structure of the response data
});

it('should borrow a book successfully when it is available', async () => {
  // Provide valid user and book IDs for borrowing
  const userId = 11; // Example user ID
  const bookId = 151; // Example book ID

  // Send a request to borrow a book
  const res = await request(app)
    .post('/borrowBook')
    .send({ userId, bookId });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ message: 'Book borrowed successfully!' });
  // Add more specific assertions based on the expected behavior
});

it('should return an error when trying to borrow a non-existent book', async () => {
  const userId = 11;
  const bookId = 9999;

  const res = await request(app)
    .post('/borrowBook')
    .send({ userId, bookId });
  expect(res.statusCode).toEqual(404);
  expect(res.body).toHaveProperty('error', 'Book not found');
});

it('should return an error when trying to borrow an unavailable book', async () => {
  // Provide a book ID for an unavailable book
  const userId = 11; // Example user ID
  const bookId = 150;

  // Send a request to borrow an unavailable book
  const res = await request(app)
    .post('/borrowBook')
    .send({ userId, bookId });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(404);
  expect(res.body).toHaveProperty('error', 'Book is not currently available');
});

it('should return a book successfully', async () => {
  // Provide a valid transaction ID and book ID for returning
  const transactionId = 18; // Example transaction ID
  const bookId = 151; // Example book ID

  // Send a request to return a book
  const res = await request(app)
    .post('/returnBook')
    .send({ transactionId, bookId });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ message: 'Item returned successfully' });
  // Add more specific assertions based on the expected behavior
});

it('should handle errors when returning a book', async () => {
  // Provide invalid transaction ID and book ID for returning
  const transactionId = 9999; // Non-existent transaction ID
  const bookId = 9999; // Non-existent book ID

  // Send a request to return a book with invalid IDs
  const res = await request(app)
    .post('/returnBook')
    .send({ transactionId, bookId });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(404); // Assuming it returns 500 for errors
  expect(res.body).toEqual({ error: 'transaction not found' });
});

it('should get all transactions successfully', async () => {
  // Send a request to get all transactions
  const res = await request(app)
    .get('/getAllTransactions')
    .query({ page: 1, limit: 10 }); // Assuming page and limit are provided

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  // Add more specific assertions based on the expected behavior
});

it('should get all transactions for a given user ID successfully', async () => {
  const userId = 11;

  const res = await request(app)
    .get('/getAllTransactionsPerId')
    .query({ id: userId, page: 1 });

  expect(res.statusCode).toEqual(200);
});

it('should handle unauthorized access when user ID is not provided', async () => {
  const res = await request(app)
    .get('/getAllTransactionsPerId');

  expect(res.statusCode).toEqual(401);
});

it('should handle errors when fetching transactions for a given user ID', async () => {
  const userId = -1;

  const res = await request(app)
    .get('/getAllTransactionsPerId')
    .query({ id: userId, page: 1 });

  expect(res.statusCode).toEqual(404);
});

it('should get all transactions for a given user ID successfully', async () => {
  // Assuming userId is a valid ID in the database
  const userId = 11; // Replace with a valid user ID

  // Send a request to get all transactions for the user ID
  const res = await request(app)
    .get('/getAllTransactionsPerId')
    .query({ id: userId, page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  // Add more specific assertions based on the expected behavior
  expect(res.body).toBeInstanceOf(Array);
});

it('should handle unauthorized access when user ID is not provided', async () => {
  // Send a request without providing a user ID
  const res = await request(app)
    .get('/getAllTransactionsPerId');

  // Assert the response status code and content
  expect(res.statusCode).toEqual(401);
  expect(res.text).toEqual('Unauthorized');
});

it('should handle errors when fetching transactions for a given user ID', async () => {
  // Assuming userId is an invalid ID that does not exist in the database
  const userId = -1; // Replace with an invalid user ID

  // Send a request to get all transactions for the user ID
  const res = await request(app)
    .get('/getAllTransactionsPerId')
    .query({ id: userId, page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(404); // Since User ID doesnt exist
  expect(res.text).toEqual('User not found');
});


it('should get the borrow history for a given user ID successfully', async () => {
  // Assuming userId is a valid ID in the database
  const userId = 11; // Replace with a valid user ID

  // Send a request to get the borrow history for the user ID
  const res = await request(app)
    .get('/getBorrowHistory')
    .query({ id: userId, page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  // Add more specific assertions based on the expected behavior
  expect(res.body).toBeInstanceOf(Array);
});

it('should handle unauthorized access when user ID is not provided', async () => {
  // Send a request without providing a user ID
  const res = await request(app)
    .get('/getBorrowHistory');

  // Assert the response status code and content
  expect(res.statusCode).toEqual(401);
  expect(res.text).toEqual('Unauthorized');
});

it('should handle errors when fetching borrow history for a given user ID', async () => {
  // Assuming userId is an invalid ID that does not exist in the database
  const userId = -1; // Replace with an invalid user ID

  // Send a request to get the borrow history for the user ID
  const res = await request(app)
    .get('/getBorrowHistory')
    .query({ id: userId, page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(404); // No Borrow History Found
  expect(res.text).toEqual('No borrow history found');
});

it('should get the borrow history for a given user ID successfully', async () => {
  // Assuming userId is a valid ID in the database
  const userId = 11; // Replace with a valid user ID

  // Send a request to get the borrow history for the user ID
  const res = await request(app)
    .get('/getBorrowHistory')
    .query({ id: userId, page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Array);
});

it('should handle unauthorized access when user ID is not provided', async () => {
  // Assuming userId doesnt exist in the database

  // Send a request without providing a user ID
  const res = await request(app)
    .get('/getBorrowHistory')
    .query({ page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(401);
  expect(res.text).toEqual('Unauthorized');
});

it('should handle errors when no transactions are found for a given user ID', async () => {
  // Assuming userId is an ID with no transactions in the database
  const userId = 999; // Replace with a user ID that has no transactions

  // Send a request to get the borrow history for the user ID
  const res = await request(app)
    .get('/getBorrowHistory')
    .query({ id: userId, page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(404); // Since Borrow history doesnt exist, use 404
  expect(res.text).toEqual('No borrow history found');
});

it('should retrieve a paginated list of users successfully', async () => {
  // Send a request to retrieve the first page of users
  const res = await request(app)
    .get('/users')
    .query({ page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Array);
  // Optionally add more assertions based on your expected data structure
});

it('should handle invalid page numbers', async () => {
  // Send a request with an invalid page number
  const res = await request(app)
    .get('/users')
    .query({ page: 'invalid' });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(400);
  expect(res.body).toEqual({ error: 'Invalid page number' });
});

it('should retrieve the borrow history of an item successfully', async () => {
  // Assuming bookId is a valid ID in the database
  const bookId = 101; // Replace with a valid book ID

  // Send a request to get the borrow history of the item
  const res = await request(app)
    .get('/getItemBorrowHistory')
    .query({ book_id: bookId, page: 1 });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Array);
  // Optionally add more assertions based on the expected data structure
});

it('should handle invalid page numbers', async () => {
  // Send a request with an invalid page number
  const res = await request(app)
    .get('/getItemBorrowHistory')
    .query({ book_id: 101, page: 'invalid' });

  // Assert the response status code and content
  expect(res.statusCode).toEqual(400);
  expect(res.body).toHaveProperty('error', 'Invalid page number');
});

it('should handle internal server errors gracefully', async () => {
  // Assuming there's a way to simulate a database error, e.g., by providing invalid SQL or using a test database
  const res = await request(app)
    .get('/getItemBorrowHistory')
    .query({ book_id: -1, page: 1 });

  // Assert the response status code and content for internal server error
  expect(res.statusCode).toEqual(404);
  expect(res.body.error).toEqual('Book not found');
});

});


