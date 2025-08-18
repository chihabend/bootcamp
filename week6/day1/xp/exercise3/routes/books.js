const express = require('express');
const router = express.Router();

const books = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(books);
});

router.post('/', (req, res) => {
  const { title, author, year, genre, isbn } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  
  const newBook = {
    id: nextId++,
    title,
    author,
    year: year || null,
    genre: genre || '',
    isbn: isbn || '',
    createdAt: new Date().toISOString()
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, year, genre, isbn } = req.body;
  
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const updatedBook = {
    ...books[bookIndex],
    title: title !== undefined ? title : books[bookIndex].title,
    author: author !== undefined ? author : books[bookIndex].author,
    year: year !== undefined ? year : books[bookIndex].year,
    genre: genre !== undefined ? genre : books[bookIndex].genre,
    isbn: isbn !== undefined ? isbn : books[bookIndex].isbn,
    updatedAt: new Date().toISOString()
  };
  
  books[bookIndex] = updatedBook;
  res.json(updatedBook);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: 'Book deleted successfully', deletedBook });
});

module.exports = router;
