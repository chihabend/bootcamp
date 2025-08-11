import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/posts';

app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get(JSONPLACEHOLDER_URL);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des posts :', error);
    res.status(500).json({ message: "Erreur lors de la récupération des posts" });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${JSONPLACEHOLDER_URL}/${id}`);
    if (!response.data || Object.keys(response.data).length === 0) {
      return res.status(404).json({ message: "Post introuvable" });
    }
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "Post introuvable" });
    } else {
      console.error('Erreur lors de la récupération du post :', error);
      res.status(500).json({ message: "Erreur lors de la récupération du post" });
    }
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Le titre et le contenu sont requis" });
  }
  try {
    const response = await axios.post(JSONPLACEHOLDER_URL, {
      title,
      body: content,
      userId: 1
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Erreur lors de la création du post :', error);
    res.status(500).json({ message: "Erreur lors de la création du post" });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Le titre et le contenu sont requis" });
  }
  try {
    await axios.get(`${JSONPLACEHOLDER_URL}/${id}`);
    const response = await axios.put(`${JSONPLACEHOLDER_URL}/${id}`, {
      title,
      body: content,
      userId: 1
    });
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "Post introuvable" });
    } else {
      console.error('Erreur lors de la mise à jour du post :', error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du post" });
    }
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await axios.get(`${JSONPLACEHOLDER_URL}/${id}`);
    const response = await axios.delete(`${JSONPLACEHOLDER_URL}/${id}`);
    res.json({ message: "Post supprimé", data: response.data });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "Post introuvable" });
    } else {
      console.error('Erreur lors de la suppression du post :', error);
      res.status(500).json({ message: "Erreur lors de la suppression du post" });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});