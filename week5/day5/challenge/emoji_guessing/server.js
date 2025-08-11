import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Emoji data
const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🚗', name: 'Car' },
    { emoji: '🏠', name: 'House' },
    { emoji: '🌙', name: 'Moon' },
    { emoji: '☀️', name: 'Sun' },
    { emoji: '🌺', name: 'Flower' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🍎', name: 'Apple' },
    { emoji: '⚽', name: 'Soccer Ball' },
    { emoji: '🎸', name: 'Guitar' },
    { emoji: '📱', name: 'Phone' },
    { emoji: '💻', name: 'Laptop' },
    { emoji: '🎮', name: 'Game Controller' },
    { emoji: '🎨', name: 'Paint Palette' },
    { emoji: '📚', name: 'Books' },
    { emoji: '🎭', name: 'Theater Masks' },
    { emoji: '🚀', name: 'Rocket' }
];

// Game state
let currentGame = null;
let leaderboard = [];

// Helper function to get random emojis
function getRandomEmojis(count) {
    const shuffled = [...emojis].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Helper function to generate game options
function generateGameOptions() {
    const correctEmoji = getRandomEmojis(1)[0];
    const otherEmojis = getRandomEmojis(3).filter(e => e.name !== correctEmoji.name);
    
    // Ensure we have exactly 3 wrong options
    while (otherEmojis.length < 3) {
        const additional = getRandomEmojis(1)[0];
        if (additional.name !== correctEmoji.name && !otherEmojis.find(e => e.name === additional.name)) {
            otherEmojis.push(additional);
        }
    }
    
    const options = [correctEmoji.name, ...otherEmojis.map(e => e.name)];
    // Shuffle options
    return {
        emoji: correctEmoji.emoji,
        correctAnswer: correctEmoji.name,
        options: options.sort(() => 0.5 - Math.random())
    };
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get new game
app.get('/api/game', (req, res) => {
    currentGame = generateGameOptions();
    res.json({
        emoji: currentGame.emoji,
        options: currentGame.options
    });
});

// Submit guess
app.post('/api/guess', (req, res) => {
    const { guess, playerName } = req.body;
    
    if (!currentGame) {
        return res.status(400).json({ error: 'No active game' });
    }
    
    const isCorrect = guess === currentGame.correctAnswer;
    
    if (isCorrect && playerName) {
        // Add to leaderboard
        const existingScore = leaderboard.find(score => score.name === playerName);
        if (existingScore) {
            existingScore.score += 1;
        } else {
            leaderboard.push({ name: playerName, score: 1 });
        }
        
        // Sort leaderboard by score (descending)
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Keep only top 10 scores
        leaderboard = leaderboard.slice(0, 10);
    }
    
    res.json({
        correct: isCorrect,
        correctAnswer: currentGame.correctAnswer,
        leaderboard: leaderboard.slice(0, 5) // Return top 5 for display
    });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard);
});

// Reset game
app.post('/api/reset', (req, res) => {
    currentGame = null;
    res.json({ message: 'Game reset' });
});

app.listen(PORT, () => {
    console.log(`Emoji Guessing Game server running on http://localhost:${PORT}`);
});
