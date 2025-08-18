const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todosRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Todo List API!',
    endpoints: {
      'GET /todos': 'Get all todo items',
      'POST /todos': 'Create a new todo item',
      'PUT /todos/:id': 'Update a todo item by ID',
      'DELETE /todos/:id': 'Delete a todo item by ID'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Todo List API server is running on http://localhost:${PORT}`);
});
