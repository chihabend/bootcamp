const express = require('express');
const router = express.Router();

const posts = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(post);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  if (title.trim().length === 0 || content.trim().length === 0) {
    return res.status(400).json({ error: 'Title and content cannot be empty' });
  }
  
  const newPost = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    timestamp: new Date().toISOString()
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  if (title !== undefined && title.trim().length === 0) {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }
  
  if (content !== undefined && content.trim().length === 0) {
    return res.status(400).json({ error: 'Content cannot be empty' });
  }
  
  const updatedPost = {
    ...posts[postIndex],
    title: title !== undefined ? title.trim() : posts[postIndex].title,
    content: content !== undefined ? content.trim() : posts[postIndex].content,
    updatedAt: new Date().toISOString()
  };
  
  posts[postIndex] = updatedPost;
  res.json(updatedPost);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const deletedPost = posts.splice(postIndex, 1)[0];
  res.json({ message: 'Post deleted successfully', deletedPost });
});

module.exports = router;
