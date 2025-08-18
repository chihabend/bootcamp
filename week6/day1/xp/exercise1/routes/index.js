const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Homepage!</h1><p>This is a simple Express.js application with routes.</p>');
});

router.get('/about', (req, res) => {
  res.send('<h1>About Us</h1><p>This is the About Us page for our Express.js application.</p>');
});

module.exports = router;
