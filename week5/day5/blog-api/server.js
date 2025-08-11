import express from 'express';
const blogPosts = [
  {
    id: 1,
    title: "Premier article",
    content: "Ceci est le contenu du premier article de blog."
  },
  {
    id: 2,
    title: "Deuxième article",
    content: "Voici le contenu du deuxième article, plus détaillé."
  },
  {
    id: 3,
    title: "Troisième article",
    content: "Un autre article pour enrichir notre base de données fictive."
  }
];
const app = express();
app.use(express.json());

app.get('/posts', (req, res, next) => {
  try {
    res.json(blogPosts);
  } catch (err) {
    next(err);
  }
});

app.get('/posts/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = blogPosts.find(p => p.id === id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Article non trouvé" });
    }
  } catch (err) {
    next(err);
  }
});

app.post('/posts', (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Titre et contenu requis" });
    }
    const newId = blogPosts.length > 0 ? Math.max(...blogPosts.map(p => p.id)) + 1 : 1;
    const newPost = { id: newId, title, content };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

app.put('/posts/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const postIndex = blogPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Article non trouvé" });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Titre et contenu requis" });
    }
    blogPosts[postIndex] = { id, title, content };
    res.json(blogPosts[postIndex]);
  } catch (err) {
    next(err);
  }
});

app.delete('/posts/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const postIndex = blogPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Article non trouvé" });
    }
    const deletedPost = blogPosts.splice(postIndex, 1)[0];
    res.json(deletedPost);
  } catch (err) {
    next(err);
  }
});


app.use((req, res, next) => {
  res.status(404).json({ error: "Itinéraire non valide" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
