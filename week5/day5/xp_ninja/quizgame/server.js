import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, path) => {
    if (path.endsWith('.html') || path.endsWith('.js') || path.endsWith('.css')) {
      res.setHeader('Content-Type', `${getContentType(path)}; charset=utf-8`);
    }
  }
}));

  
const getContentType = (filePath) => {
  if (filePath.endsWith('.html')) return 'text/html';
  if (filePath.endsWith('.js')) return 'application/javascript';
  if (filePath.endsWith('.css')) return 'text/css';
  return 'text/plain';
};

const questions = [
  {
    id: 1,
    type: "mcq",
    difficulty: "easy",
    question: "Quelle est la capitale de la France ?",
    choices: ["Paris", "Lyon", "Marseille", "Toulouse"],
    correctIndex: 0
  },
  {
    id: 2,
    type: "mcq",
    difficulty: "easy",
    question: "Quel mot-cl� d�clare une constante en JavaScript (ES6) ?",
    choices: ["var", "let", "const", "static"],
    correctIndex: 2
  },
  {
    id: 3,
    type: "mcq",
    difficulty: "medium",
    question: "Quelle m�thode transforme une cha�ne JSON en objet ?",
    choices: ["JSON.stringify", "JSON.parse", "Object.fromJSON", "parseJSON"],
    correctIndex: 1
  },
  {
    id: 4,
    type: "mcq",
    difficulty: "medium",
    question: "Quel est le r�sultat de 2 ** 3 en JavaScript ?",
    choices: ["5", "6", "8", "9"],
    correctIndex: 2
  },
  {
    id: 5,
    type: "mcq",
    difficulty: "easy",
    question: "Quel est le type de 'null' en JavaScript ?",
    choices: ["null", "undefined", "object", "string"],
    correctIndex: 2
  }
];

app.get("/api/questions", (req, res) => {
  res.json({ questions });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Serveur d�marr� sur http://localhost:${PORT}`);
});
