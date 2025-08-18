const express = require('express');
const todosRouter = require('./server/routes/todos');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/todos', todosRouter);

app.get('/api/books', (req, res) => {
  res.json([]);
});

app.get('/api/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  res.status(404).json({ message: 'Book not found' });
});

app.post('/api/books', (req, res) => {
  res.json({ message: 'Book created' });
});

app.listen(PORT, () => {
  console.log(`Todo List API server is running on http://localhost:${PORT}`);
});
