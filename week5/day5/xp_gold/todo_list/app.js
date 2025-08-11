import express from 'express';
const app = express();
app.use(express.json());

let todos = [];
let nextId = 1;

app.post('/api/todos', (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Le titre est requis" });
  }
  const todo = {
    id: nextId++,
    title,
    completed: completed === true
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }
  res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }
  const deleted = todos.splice(index, 1)[0];
  res.json({ message: "Tâche supprimée", todo: deleted });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur Todo List en cours d'exécution sur le port ${PORT}`);
});
