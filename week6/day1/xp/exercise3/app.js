const express = require('express');
const booksRouter = require('./routes/books');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', booksRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Books Management API!',
    endpoints: {
      'GET /books': 'Get all books',
      'POST /books': 'Create a new book',
      'PUT /books/:id': 'Update a book by ID',
      'DELETE /books/:id': 'Delete a book by ID'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Books API server is running on http://localhost:${PORT}`);
});
