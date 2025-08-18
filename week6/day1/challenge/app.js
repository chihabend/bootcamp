const express = require('express');
const quizRouter = require('./routes/quiz');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', quizRouter);

app.listen(PORT, () => {
  console.log(`Trivia Quiz Game is running on http://localhost:${PORT}`);
});
