
const board = Array(9).fill(null);
let player = 'X';
let computer = 'O';
let gameActive = true;
let difficulty = 'easy';

const boardDiv = document.getElementById('board');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const chooseXBtn = document.getElementById('chooseX');
const chooseOBtn = document.getElementById('chooseO');

function renderBoard() {
    boardDiv.innerHTML = '';
    board.forEach((cell, idx) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.textContent = cell ? cell : '';
        cellDiv.addEventListener('click', () => handleCellClick(idx));
        boardDiv.appendChild(cellDiv);
    });
}

function handleCellClick(idx) {
    if (!gameActive || board[idx]) return;
    board[idx] = player;
    renderBoard();
    if (checkWin(player)) {
        statusDiv.textContent = 'You win!';
        gameActive = false;
        restartBtn.style.display = 'inline-block';
        return;
    }
    if (board.every(cell => cell)) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
        restartBtn.style.display = 'inline-block';
        return;
    }
    statusDiv.textContent = "Computer's turn...";
    setTimeout(computerMove, 500);
}

function computerMove() {
    if (!gameActive) return;
    let move = randomMove();
    if (move !== undefined) {
        board[move] = computer;
        renderBoard();
        if (checkWin(computer)) {
            statusDiv.textContent = 'Computer wins!';
            gameActive = false;
            restartBtn.style.display = 'inline-block';
            return;
        }
        if (board.every(cell => cell)) {
            statusDiv.textContent = "It's a draw!";
            gameActive = false;
            restartBtn.style.display = 'inline-block';
            return;
        }
        statusDiv.textContent = 'Your turn!';
    }
}

function randomMove() {
    const empty = board.map((cell, i) => cell ? null : i).filter(i => i !== null);
    if (empty.length === 0) return;
    return empty[Math.floor(Math.random() * empty.length)];
}

function checkWin(symbol) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8], 
        [0,4,8],[2,4,6]        
    ];
    return wins.some(line => line.every(i => board[i] === symbol));
}


restartBtn.onclick = () => {
    newGame();
    restartBtn.style.display = 'none';
};

chooseXBtn.onclick = () => {
    player = 'X';
    computer = 'O';
    chooseXBtn.classList.add('active');
    chooseOBtn.classList.remove('active');
    newGame();
    restartBtn.style.display = 'none';
};

chooseOBtn.onclick = () => {
    player = 'O';
    computer = 'X';
    chooseOBtn.classList.add('active');
    chooseXBtn.classList.remove('active');
    newGame();
    restartBtn.style.display = 'none';

    statusDiv.textContent = "Computer's turn...";
    setTimeout(computerMove, 500);
};

function newGame() {
    for (let i = 0; i < 9; i++) board[i] = null;
    gameActive = true;
    renderBoard();
    statusDiv.textContent = 'Your turn!';
}
renderBoard();
statusDiv.textContent = 'Your turn!';
restartBtn.style.display = 'none';
