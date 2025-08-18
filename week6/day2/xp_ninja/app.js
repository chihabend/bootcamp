const express = require('express');
const quizRouter = require('./server/routes/quiz');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/quiz', quizRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Quiz Game server is running on http://localhost:${PORT}`);
});
