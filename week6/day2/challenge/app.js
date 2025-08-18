const express = require('express');
const usersRouter = require('./server/routes/users');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the User Management API!',
    endpoints: {
      'POST /users/register': 'Register a new user',
      'POST /users/login': 'Login user',
      'GET /users': 'Get all users',
      'GET /users/:id': 'Get user by ID',
      'PUT /users/:id': 'Update user by ID'
    }
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`User Management API server is running on http://localhost:${PORT}`);
});
