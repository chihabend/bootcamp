const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const usersFile = path.join(__dirname, 'data', 'users.json');

const ensureDataDirectory = () => {
  const dataDir = path.dirname(usersFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const readUsers = () => {
  try {
    if (fs.existsSync(usersFile)) {
      const dataBuffer = fs.readFileSync(usersFile);
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

const writeUsers = (users) => {
  try {
    ensureDataDirectory();
    const dataJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFile, dataJSON);
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
};

const generateId = () => uuidv4();

app.post('/register', async (req, res) => {
  try {
    const { name, lastName, email, username, password } = req.body;

    if (!name || !lastName || !email || !username || !password) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    const users = readUsers();

    const existingUser = users.find(user => 
      user.username === username || user.email === email
    );

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Username or email already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: generateId(),
      name,
      lastName,
      email,
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    
    if (writeUsers(users)) {
      res.status(201).json({ 
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          lastName: newUser.lastName,
          email: newUser.email,
          username: newUser.username,
          createdAt: newUser.createdAt
        }
      });
    } else {
      res.status(500).json({ error: 'Failed to save user' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    const users = readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ 
        error: 'User not found' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid password' 
      });
    }

    res.json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', (req, res) => {
  try {
    const users = readUsers();
    const usersWithoutPasswords = users.map(user => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt
    }));
    
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const users = readUsers();
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt
    };

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, username } = req.body;

    if (!name || !lastName || !email || !username) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingUser = users.find(user => 
      (user.username === username || user.email === email) && user.id !== id
    );

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Username or email already exists' 
      });
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      lastName,
      email,
      username,
      updatedAt: new Date().toISOString()
    };

    if (writeUsers(users)) {
      const updatedUser = {
        id: users[userIndex].id,
        name: users[userIndex].name,
        lastName: users[userIndex].lastName,
        email: users[userIndex].email,
        username: users[userIndex].username,
        createdAt: users[userIndex].createdAt,
        updatedAt: users[userIndex].updatedAt
      };

      res.json({ 
        message: 'User updated successfully',
        user: updatedUser
      });
    } else {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`User Management API server running on port ${PORT}`);
  console.log(`Login page: http://localhost:${PORT}`);
  console.log(`Register page: http://localhost:${PORT}/register`);
});
