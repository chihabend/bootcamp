import express from 'express';

const books = [
  {
    id: 1,
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    publishedYear: 1943
  },
  {
    id: 2,
    title: "L'Étranger",
    author: "Albert Camus",
    publishedYear: 1942
  },
  {
    id: 3,
    title: "Les Misérables",
    author: "Victor Hugo",
    publishedYear: 1862
  }
];

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId, 10);
  const book = books.find(b => b.id === bookId);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Livre introuvable" });
  }
});

app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;
  if (!title || !author || !publishedYear) {
    return res.status(400).json({ message: "Titre, auteur et année de publication requis" });
  }
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const newBook = {
    id: newId,
    title,
    author,
    publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
