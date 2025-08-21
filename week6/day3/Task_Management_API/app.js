import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import taskRoutes from './routes/tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Task Management API is running!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
