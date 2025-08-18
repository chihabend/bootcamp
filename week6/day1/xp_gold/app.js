const express = require('express');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Blog API!',
    endpoints: {
      'GET /posts': 'Get all blog posts',
      'GET /posts/:id': 'Get a specific blog post by ID',
      'POST /posts': 'Create a new blog post',
      'PUT /posts/:id': 'Update a blog post by ID',
      'DELETE /posts/:id': 'Delete a blog post by ID'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Blog API server is running on http://localhost:${PORT}`);
});
