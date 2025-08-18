const express = require('express');
const greetingRouter = require('./routes/greeting');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', greetingRouter);

app.listen(PORT, () => {
  console.log(`Emoji Greeting App is running on http://localhost:${PORT}`);
});
