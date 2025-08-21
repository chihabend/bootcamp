import express from 'express';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const tasksFile = join(__dirname, '..', 'data', 'tasks.json');

const ensureDataDirectory = async () => {
  const dataDir = join(dirname(__filename), '..', 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

const readTasks = async () => {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(tasksFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(tasksFile, '[]');
      return [];
    }
    throw error;
  }
};

const writeTasks = async (tasks) => {
  await ensureDataDirectory();
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

router.get('/', async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read tasks' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read task' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, status = 'pending', priority = 'medium' } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ 
        error: 'Title and description are required' 
      });
    }
    
    const tasks = await readTasks();
    const newTask = {
      id: generateId(),
      title,
      description,
      status,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await writeTasks(tasks);
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    
    if (!title && !description && !status && !priority) {
      return res.status(400).json({ 
        error: 'At least one field must be provided for update' 
      });
    }
    
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...(title && { title }),
      ...(description && { description }),
      ...(status && { status }),
      ...(priority && { priority }),
      updatedAt: new Date().toISOString()
    };
    
    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    await writeTasks(tasks);
    
    res.json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
