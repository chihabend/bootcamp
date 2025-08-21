class StrategyGame {
  constructor() {
    this.playerId = null;
    this.username = null;
    this.currentGame = null;
    this.gameBoard = null;
    this.isMyTurn = false;
    this.gameInterval = null;
    
    this.initializeEventListeners();
    this.loadStoredPlayer();
  }

  initializeEventListeners() {
    document.getElementById('create-player-btn').addEventListener('click', () => this.createPlayer());
    document.getElementById('create-game-btn').addEventListener('click', () => this.createGame());
    document.getElementById('join-game-btn').addEventListener('click', () => this.showGamesList());
    document.getElementById('back-to-menu-btn').addEventListener('click', () => this.showLoginSection());
    document.getElementById('new-game-btn').addEventListener('click', () => this.createNewGame());
    document.getElementById('leave-game-btn').addEventListener('click', () => this.leaveGame());
    document.getElementById('play-again-btn').addEventListener('click', () => this.createNewGame());
    document.getElementById('back-to-menu-modal-btn').addEventListener('click', () => this.showLoginSection());

    document.querySelectorAll('[data-direction]').forEach(btn => {
      btn.addEventListener('click', (e) => this.makeMove(e.target.dataset.direction));
    });

    document.getElementById('username').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.createPlayer();
    });
  }

  loadStoredPlayer() {
    const storedPlayer = localStorage.getItem('strategyGamePlayer');
    if (storedPlayer) {
      const player = JSON.parse(storedPlayer);
      this.playerId = player.id;
      this.username = player.username;
      this.showPlayerCreated();
    }
  }

  async createPlayer() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
      this.showNotification('Please enter a username', 'error');
      return;
    }

    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (response.ok) {
        const data = await response.json();
        this.playerId = data.playerId;
        this.username = data.username;
        
        localStorage.setItem('strategyGamePlayer', JSON.stringify(data));
        this.showPlayerCreated();
        this.showNotification('Player created successfully!', 'success');
      } else {
        const error = await response.json();
        this.showNotification(error.error, 'error');
      }
    } catch (error) {
      this.showNotification('Failed to create player', 'error');
    }
  }

  showPlayerCreated() {
    document.getElementById('player-id').textContent = this.playerId;
    document.getElementById('player-created').style.display = 'block';
    document.getElementById('create-player-btn').style.display = 'none';
  }

  async createGame() {
    if (!this.playerId) return;

    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: this.playerId })
      });

      if (response.ok) {
        const data = await response.json();
        this.currentGame = data.game;
        this.showGameSection();
        this.initializeGameBoard();
        this.showNotification('Game created! Waiting for opponent...', 'info');
        this.startGamePolling();
      } else {
        const error = await response.json();
        this.showNotification(error.error, 'error');
      }
    } catch (error) {
      this.showNotification('Failed to create game', 'error');
    }
  }

  async showGamesList() {
    try {
      const response = await fetch('/api/games');
      if (response.ok) {
        const games = await response.json();
        this.displayGamesList(games);
        this.showSection('games-list-section');
      } else {
        this.showNotification('Failed to load games', 'error');
      }
    } catch (error) {
      this.showNotification('Failed to load games', 'error');
    }
  }

  displayGamesList(games) {
    const gamesList = document.getElementById('games-list');
    if (games.length === 0) {
      gamesList.innerHTML = '<p>No games available. Create a new one!</p>';
      return;
    }

    gamesList.innerHTML = games.map(game => `
      <div class="game-item" onclick="game.joinGame('${game.id}')">
        <h3>Game by ${game.player1}</h3>
        <p>Created: ${new Date(game.createdAt).toLocaleString()}</p>
        <p>Status: Waiting for opponent</p>
      </div>
    `).join('');
  }

  async joinGame(gameId) {
    if (!this.playerId) return;

    try {
      const response = await fetch(`/api/games/${gameId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: this.playerId })
      });

      if (response.ok) {
        const data = await response.json();
        this.currentGame = data.game;
        this.showGameSection();
        this.initializeGameBoard();
        this.showNotification('Joined game successfully!', 'success');
        this.startGamePolling();
      } else {
        const error = await response.json();
        this.showNotification(error.error, 'error');
      }
    } catch (error) {
      this.showNotification('Failed to join game', 'error');
    }
  }

  showGameSection() {
    this.showSection('game-section');
    this.updateGameInfo();
  }

  showSection(sectionId) {
    document.querySelectorAll('.game-section').forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'flex';
  }

  showLoginSection() {
    this.showSection('login-section');
    this.stopGamePolling();
    this.currentGame = null;
  }

  initializeGameBoard() {
    this.gameBoard = document.getElementById('game-board');
    this.gameBoard.innerHTML = '';
    
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell empty';
        cell.dataset.x = x;
        cell.dataset.y = y;
        this.gameBoard.appendChild(cell);
      }
    }
    
    this.updateGameBoard();
  }

  updateGameBoard() {
    if (!this.currentGame) return;

    const cells = this.gameBoard.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      const x = parseInt(cell.dataset.x);
      const y = parseInt(cell.dataset.y);
      const gridData = this.currentGame.grid[y][x];
      
      cell.className = `grid-cell ${gridData.type}`;
      if (gridData.player) {
        cell.classList.add(gridData.player);
      }
      
      if (gridData.type === 'empty' && this.isValidMovePosition(x, y)) {
        cell.classList.add('valid-move');
      }
    });

    this.updatePlayerInfo();
    this.updateMoveHistory();
    this.updateGameStatus();
  }

  isValidMovePosition(x, y) {
    if (!this.currentGame || !this.isMyTurn) return false;
    
    const myPosition = this.currentGame.myPosition;
    const dx = Math.abs(x - myPosition.x);
    const dy = Math.abs(y - myPosition.y);
    
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }

  updatePlayerInfo() {
    if (!this.currentGame) return;

    document.getElementById('player1-name').textContent = 'Player 1';
    document.getElementById('player1-pos').textContent = `(${this.currentGame.player1Position.x}, ${this.currentGame.player1Position.y})`;
    
    document.getElementById('player2-name').textContent = 'Player 2';
    document.getElementById('player2-pos').textContent = `(${this.currentGame.player2Position.x}, ${this.currentGame.player2Position.y})`;
  }

  updateMoveHistory() {
    if (!this.currentGame) return;

    const movesList = document.getElementById('moves-list');
    const moveCount = document.getElementById('move-count');
    
    moveCount.textContent = `Moves: ${this.currentGame.moves.length}`;
    
    movesList.innerHTML = this.currentGame.moves.slice(-10).map(move => `
      <div class="move-item">
        <strong>${move.playerId === this.playerId ? 'You' : 'Opponent'}</strong>: 
        ${move.direction} (${move.from.x},${move.from.y}) → (${move.to.x},${move.to.y})
      </div>
    `).join('');
  }

  updateGameStatus() {
    if (!this.currentGame) return;

    const gameInfo = document.getElementById('game-info');
    const currentTurn = document.getElementById('current-turn');
    const gameStatus = document.getElementById('game-status');
    const statusMessage = document.getElementById('status-message');

    if (this.currentGame.state === 'waiting') {
      gameInfo.style.display = 'block';
      currentTurn.textContent = 'Waiting for opponent...';
      gameStatus.textContent = 'Game not started';
      statusMessage.textContent = 'Waiting for opponent to join...';
    } else if (this.currentGame.state === 'playing') {
      gameInfo.style.display = 'block';
      this.isMyTurn = this.currentGame.isMyTurn;
      
      if (this.isMyTurn) {
        currentTurn.textContent = 'Your turn!';
        gameStatus.textContent = 'Make your move';
        statusMessage.textContent = 'Use the control buttons to move';
        this.enableControls();
      } else {
        currentTurn.textContent = 'Opponent\'s turn';
        gameStatus.textContent = 'Waiting for opponent...';
        statusMessage.textContent = 'Opponent is thinking...';
        this.disableControls();
      }
    } else if (this.currentGame.state === 'finished') {
      gameInfo.style.display = 'block';
      currentTurn.textContent = 'Game Over!';
      gameStatus.textContent = this.currentGame.winner === this.playerId ? 'You won!' : 'You lost!';
      statusMessage.textContent = 'Game has ended';
      this.disableControls();
      this.showGameOverModal();
    }
  }

  enableControls() {
    document.querySelectorAll('.btn-control').forEach(btn => {
      btn.disabled = false;
    });
  }

  disableControls() {
    document.querySelectorAll('.btn-control').forEach(btn => {
      btn.disabled = true;
    });
  }

  async makeMove(direction) {
    if (!this.currentGame || !this.isMyTurn) return;

    try {
      const response = await fetch(`/api/games/${this.currentGame.id}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          playerId: this.playerId, 
          direction 
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.currentGame = data.game;
        this.updateGameBoard();
        
        if (data.gameOver) {
          this.showGameOverModal(data.message, data.winner === this.playerId);
        } else {
          this.showNotification(`Moved ${direction}`, 'success');
        }
      } else {
        const error = await response.json();
        this.showNotification(error.error, 'error');
      }
    } catch (error) {
      this.showNotification('Failed to make move', 'error');
    }
  }

  showGameOverModal(message = '', isWinner = false) {
    const modal = document.getElementById('game-over-modal');
    const title = document.getElementById('game-over-title');
    const messageEl = document.getElementById('game-over-message');

    title.textContent = isWinner ? 'Victory!' : 'Defeat!';
    messageEl.textContent = message || (isWinner ? 'Congratulations! You captured the opponent\'s base!' : 'Better luck next time!');
    
    modal.classList.remove('hidden');
  }

  startGamePolling() {
    this.stopGamePolling();
    this.gameInterval = setInterval(() => this.pollGameState(), 2000);
  }

  stopGamePolling() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
  }

  async pollGameState() {
    if (!this.currentGame || !this.playerId) return;

    try {
      const response = await fetch(`/api/games/${this.currentGame.id}?playerId=${this.playerId}`);
      if (response.ok) {
        const gameState = await response.json();
        this.currentGame = gameState;
        this.updateGameBoard();
      }
    } catch (error) {
      console.error('Failed to poll game state:', error);
    }
  }

  createNewGame() {
    document.getElementById('game-over-modal').classList.add('hidden');
    this.createGame();
  }

  leaveGame() {
    this.stopGamePolling();
    this.currentGame = null;
    this.showLoginSection();
  }

  showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }
}

const game = new StrategyGame();
