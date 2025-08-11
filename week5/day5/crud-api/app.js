import express from 'express';
import { fetchPosts } from './data/dataService.js';

const app = express();

app.get('/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.json(posts);
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
