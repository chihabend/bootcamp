// Game state
let currentGame = null;
let playerScore = 0;
let playerName = '';
let canGuess = true;

// DOM elements
const emojiDisplay = document.getElementById('emojiDisplay');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const playerScoreElement = document.getElementById('playerScore');
const leaderboardList = document.getElementById('leaderboardList');
const nextBtn = document.getElementById('nextBtn');
const playerNameInput = document.getElementById('playerName');

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard();
    playerNameInput.addEventListener('input', (e) => {
        playerName = e.target.value.trim();
    });
});

// Load leaderboard
async function loadLeaderboard() {
    try {
        const response = await fetch('/api/leaderboard');
        const leaderboard = await response.json();
        updateLeaderboardDisplay(leaderboard);
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

// Start a new game
async function startNewGame() {
    if (!playerName) {
        alert('Please enter your name first!');
        return;
    }

    try {
        const response = await fetch('/api/game');
        currentGame = await response.json();
        
        // Update display
        emojiDisplay.textContent = currentGame.emoji;
        
        // Update options
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');
        currentGame.options.forEach((option, index) => {
            optionButtons[index].textContent = option;
            optionButtons[index].className = 'option-btn';
            optionButtons[index].disabled = false;
        });
        
        // Reset UI state
        feedback.classList.add('hidden');
        nextBtn.classList.add('hidden');
        canGuess = true;
        
        // Add loading class to options
        optionsContainer.classList.remove('loading');
        
    } catch (error) {
        console.error('Error starting new game:', error);
        alert('Error starting game. Please try again.');
    }
}

// Handle option selection
async function selectOption(button) {
    if (!canGuess || !currentGame) return;
    
    const selectedAnswer = button.textContent;
    canGuess = false;
    
    try {
        const response = await fetch('/api/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guess: selectedAnswer,
                playerName: playerName
            })
        });
        
        const result = await response.json();
        
        // Show feedback
        showFeedback(result.correct, result.correctAnswer);
        
        // Update score if correct
        if (result.correct) {
            playerScore++;
            playerScoreElement.textContent = playerScore;
        }
        
        // Update leaderboard
        updateLeaderboardDisplay(result.leaderboard);
        
        // Show next button
        nextBtn.classList.remove('hidden');
        
        // Disable all options
        const allButtons = optionsContainer.querySelectorAll('.option-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === result.correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent === selectedAnswer && !result.correct) {
                btn.classList.add('incorrect');
            }
        });
        
    } catch (error) {
        console.error('Error submitting guess:', error);
        alert('Error submitting guess. Please try again.');
    }
}

// Show feedback message
function showFeedback(isCorrect, correctAnswer) {
    feedback.classList.remove('hidden');
    
    if (isCorrect) {
        feedback.textContent = `🎉 Correct! Well done!`;
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `❌ Wrong! The correct answer was: ${correctAnswer}`;
        feedback.className = 'feedback incorrect';
    }
}

// Move to next round
function nextRound() {
    startNewGame();
}

// Update leaderboard display
function updateLeaderboardDisplay(leaderboard) {
    if (!leaderboard || leaderboard.length === 0) {
        leaderboardList.innerHTML = '<div class="leaderboard-item"><span>No scores yet</span><span>0</span></div>';
        return;
    }
    
    leaderboardList.innerHTML = leaderboard.map(score => 
        `<div class="leaderboard-item">
            <span>${score.name}</span>
            <span>${score.score}</span>
        </div>`
    ).join('');
}

// Auto-start game when player name is entered
playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && playerName && !currentGame) {
        startNewGame();
    }
});

// Start game button (alternative to Enter key)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && playerName && !currentGame) {
        startNewGame();
    }
});

// Add click event to start game when name is entered
playerNameInput.addEventListener('blur', () => {
    if (playerName && !currentGame) {
        setTimeout(() => startNewGame(), 100);
    }
});
