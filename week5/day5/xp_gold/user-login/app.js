import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express();
app.use(express.json());

const users = [];
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 10 * 60 * 1000;
const JWT_SECRET = 'votre_secret_jwt';

function validatePassword(password) {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    password.length >= minLength &&
    hasUpper &&
    hasLower &&
    hasDigit &&
    hasSpecial
  );
}

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide' });
  }
}

function roleMiddleware(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Accès refusé' });
    }
  };
}

app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
  if (findUserByUsername(username))
    return res.status(409).json({ message: 'Utilisateur déjà existant' });
  if (!validatePassword(password))
    return res.status(400).json({ message: 'Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.' });
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    username,
    password: hashedPassword,
    role: role || 'user',
    loginAttempts: 0,
    lockUntil: null
  });
  res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
  const user = findUserByUsername(username);
  if (!user)
    return res.status(401).json({ message: 'Identifiants invalides' });

  if (user.lockUntil && user.lockUntil > Date.now()) {
    return res.status(403).json({ message: 'Compte verrouillé. Réessayez plus tard.' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      user.lockUntil = Date.now() + LOCK_TIME;
      return res.status(403).json({ message: 'Compte verrouillé après trop de tentatives.' });
    }
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  user.loginAttempts = 0;
  user.lockUntil = null;
  const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Connexion réussie', token });
});

app.get('/api/profile', authMiddleware, (req, res) => {
  const user = findUserByUsername(req.user.username);
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.json({ username: user.username, role: user.role });
});

app.get('/api/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Bienvenue, administrateur!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
