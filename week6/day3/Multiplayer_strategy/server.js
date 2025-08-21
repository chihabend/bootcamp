import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

const GRID_SIZE = 10;
const GAME_STATES = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHED: 'finished'
};

const games = new Map();
const players = new Map();

class Game {
  constructor(id, player1Id) {
    this.id = id;
    this.player1Id = player1Id;
    this.player2Id = null;
    this.currentTurn = player1Id;
    this.state = GAME_STATES.WAITING;
    this.grid = this.initializeGrid();
    this.player1Position = { x: 0, y: 0 };
    this.player2Position = { x: GRID_SIZE - 1, y: GRID_SIZE - 1 };
    this.player1Base = { x: 0, y: 0 };
    this.player2Base = { x: GRID_SIZE - 1, y: GRID_SIZE - 1 };
    this.obstacles = this.generateObstacles();
    this.moves = [];
    this.winner = null;
    this.createdAt = new Date();
  }

  initializeGrid() {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      grid[y] = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        grid[y][x] = { type: 'empty', player: null };
      }
    }
    return grid;
  }

  generateObstacles() {
    const obstacles = [];
    const numObstacles = Math.floor(GRID_SIZE * GRID_SIZE * 0.15);
    
    for (let i = 0; i < numObstacles; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
      } while (
        (x === 0 && y === 0) ||
        (x === GRID_SIZE - 1 && y === GRID_SIZE - 1) ||
        obstacles.some(obs => obs.x === x && obs.y === y)
      );
      
      obstacles.push({ x, y });
      this.grid[y][x] = { type: 'obstacle', player: null };
    }
    
    return obstacles;
  }

  addPlayer(playerId) {
    if (!this.player2Id) {
      this.player2Id = playerId;
      this.state = GAME_STATES.PLAYING;
      this.updateGrid();
      return true;
    }
    return false;
  }

  updateGrid() {
    this.grid = this.initializeGrid();
    
    this.obstacles.forEach(obs => {
      this.grid[obs.y][obs.x] = { type: 'obstacle', player: null };
    });
    
    this.grid[this.player1Base.y][this.player1Base.x] = { type: 'base', player: 'player1' };
    this.grid[this.player2Base.y][this.player2Base.x] = { type: 'base', player: 'player2' };
    
    this.grid[this.player1Position.y][this.player1Position.x] = { type: 'player', player: 'player1' };
    this.grid[this.player2Position.y][this.player2Position.x] = { type: 'player', player: 'player2' };
  }

  isValidMove(playerId, direction) {
    if (this.state !== GAME_STATES.PLAYING || this.currentTurn !== playerId) {
      return false;
    }

    const playerPos = playerId === this.player1Id ? this.player1Position : this.player2Position;
    let newX = playerPos.x;
    let newY = playerPos.y;

    switch (direction) {
      case 'up': newY = Math.max(0, playerPos.y - 1); break;
      case 'down': newY = Math.min(GRID_SIZE - 1, playerPos.y + 1); break;
      case 'left': newX = Math.max(0, playerPos.x - 1); break;
      case 'right': newX = Math.min(GRID_SIZE - 1, playerPos.x + 1); break;
      default: return false;
    }

    if (newX === playerPos.x && newY === playerPos.y) return false;

    const targetCell = this.grid[newY][newX];
    return targetCell.type === 'empty' || targetCell.type === 'base';
  }

  makeMove(playerId, direction) {
    if (!this.isValidMove(playerId, direction)) {
      return { success: false, message: 'Invalid move' };
    }

    const playerPos = playerId === this.player1Id ? this.player1Position : this.player2Position;
    const opponentBase = playerId === this.player1Id ? this.player2Base : this.player1Base;
    
    let newX = playerPos.x;
    let newY = playerPos.y;

    switch (direction) {
      case 'up': newY = Math.max(0, playerPos.y - 1); break;
      case 'down': newY = Math.min(GRID_SIZE - 1, playerPos.y + 1); break;
      case 'left': newX = Math.max(0, playerPos.x - 1); break;
      case 'right': newX = Math.min(GRID_SIZE - 1, playerPos.x + 1); break;
    }

    const move = {
      playerId,
      direction,
      from: { x: playerPos.x, y: playerPos.y },
      to: { x: newX, y: newY },
      timestamp: new Date()
    };

    this.moves.push(move);

    if (playerId === this.player1Id) {
      this.player1Position = { x: newX, y: newY };
    } else {
      this.player2Position = { x: newX, y: newY };
    }

    this.updateGrid();

    if (this.checkWinCondition(playerId, newX, newY)) {
      this.state = GAME_STATES.FINISHED;
      this.winner = playerId;
      return { success: true, gameOver: true, winner: playerId, message: 'Game Over! You won!' };
    }

    this.currentTurn = this.currentTurn === this.player1Id ? this.player2Id : this.player1Id;

    return { 
      success: true, 
      gameOver: false, 
      message: 'Move successful',
      nextTurn: this.currentTurn
    };
  }

  checkWinCondition(playerId, x, y) {
    const opponentBase = playerId === this.player1Id ? this.player2Base : this.player1Base;
    
    if (x === opponentBase.x && y === opponentBase.y) {
      return true;
    }

    const adjacentPositions = [
      { x: opponentBase.x - 1, y: opponentBase.y },
      { x: opponentBase.x + 1, y: opponentBase.y },
      { x: opponentBase.x, y: opponentBase.y - 1 },
      { x: opponentBase.x, y: opponentBase.y + 1 }
    ];

    return adjacentPositions.some(pos => 
      pos.x === x && pos.y === y && 
      pos.x >= 0 && pos.x < GRID_SIZE && 
      pos.y >= 0 && pos.y < GRID_SIZE
    );
  }

  getGameState(playerId) {
    const isPlayer1 = playerId === this.player1Id;
    const currentPlayerPos = isPlayer1 ? this.player1Position : this.player2Position;
    const opponentPlayerPos = isPlayer1 ? this.player2Position : this.player1Position;
    
    return {
      id: this.id,
      state: this.state,
      currentTurn: this.currentTurn,
      grid: this.grid,
      player1Position: this.player1Position,
      player2Position: this.player2Position,
      player1Base: this.player1Base,
      player2Base: this.player2Base,
      obstacles: this.obstacles,
      moves: this.moves,
      winner: this.winner,
      isMyTurn: this.currentTurn === playerId,
      myPosition: currentPlayerPos,
      opponentPosition: opponentPlayerPos,
      createdAt: this.createdAt
    };
  }
}

app.post('/api/players', (req, res) => {
  const { username } = req.body;
  
  if (!username || username.trim().length < 2) {
    return res.status(400).json({ error: 'Username must be at least 2 characters long' });
  }

  const playerId = uuidv4();
  players.set(playerId, { id: playerId, username, createdAt: new Date() });
  
  res.status(201).json({ 
    playerId, 
    username,
    message: 'Player created successfully' 
  });
});

app.get('/api/players/:playerId', (req, res) => {
  const { playerId } = req.params;
  const player = players.get(playerId);
  
  if (!player) {
    return res.status(404).json({ error: 'Player not found' });
  }
  
  res.json(player);
});

app.post('/api/games', (req, res) => {
  const { playerId } = req.body;
  
  if (!playerId || !players.has(playerId)) {
    return res.status(400).json({ error: 'Valid player ID required' });
  }

  const gameId = uuidv4();
  const game = new Game(gameId, playerId);
  games.set(gameId, game);
  
  res.status(201).json({ 
    gameId, 
    message: 'Game created successfully',
    game: game.getGameState(playerId)
  });
});

app.get('/api/games', (req, res) => {
  const availableGames = Array.from(games.values())
    .filter(game => game.state === GAME_STATES.WAITING)
    .map(game => ({
      id: game.id,
      player1: players.get(game.player1Id)?.username,
      createdAt: game.createdAt
    }));
  
  res.json(availableGames);
});

app.post('/api/games/:gameId/join', (req, res) => {
  const { gameId } = req.params;
  const { playerId } = req.body;
  
  if (!playerId || !players.has(playerId)) {
    return res.status(400).json({ error: 'Valid player ID required' });
  }
  
  const game = games.get(gameId);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (game.state !== GAME_STATES.WAITING) {
    return res.status(400).json({ error: 'Game is not available for joining' });
  }
  
  if (game.player1Id === playerId) {
    return res.status(400).json({ error: 'Cannot join your own game' });
  }
  
  const success = game.addPlayer(playerId);
  if (!success) {
    return res.status(400).json({ error: 'Game is full' });
  }
  
  res.json({ 
    message: 'Joined game successfully',
    game: game.getGameState(playerId)
  });
});

app.get('/api/games/:gameId', (req, res) => {
  const { gameId } = req.params;
  const { playerId } = req.query;
  
  if (!playerId || !players.has(playerId)) {
    return res.status(400).json({ error: 'Valid player ID required' });
  }
  
  const game = games.get(gameId);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (game.player1Id !== playerId && game.player2Id !== playerId) {
    return res.status(403).json({ error: 'Not a player in this game' });
  }
  
  res.json(game.getGameState(playerId));
});

app.post('/api/games/:gameId/move', (req, res) => {
  const { gameId } = req.params;
  const { playerId, direction } = req.body;
  
  if (!playerId || !players.has(playerId)) {
    return res.status(400).json({ error: 'Valid player ID required' });
  }
  
  if (!direction || !['up', 'down', 'left', 'right'].includes(direction)) {
    return res.status(400).json({ error: 'Valid direction required' });
  }
  
  const game = games.get(gameId);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (game.player1Id !== playerId && game.player2Id !== playerId) {
    return res.status(403).json({ error: 'Not a player in this game' });
  }
  
  const result = game.makeMove(playerId, direction);
  
  if (result.success) {
    res.json({
      message: result.message,
      gameOver: result.gameOver,
      winner: result.winner,
      nextTurn: result.nextTurn,
      game: game.getGameState(playerId)
    });
  } else {
    res.status(400).json({ error: result.message });
  }
});

app.get('/api/games/:gameId/moves', (req, res) => {
  const { gameId } = req.params;
  const { playerId } = req.query;
  
  if (!playerId || !players.has(playerId)) {
    return res.status(400).json({ error: 'Valid player ID required' });
  }
  
  const game = games.get(gameId);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (game.player1Id !== playerId && game.player2Id !== playerId) {
    return res.status(403).json({ error: 'Not a player in this game' });
  }
  
  res.json({ moves: game.moves });
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Strategy game server running on port ${PORT}`);
});
