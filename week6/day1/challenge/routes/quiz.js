const express = require('express');
const router = express.Router();

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "Au",
  },
  {
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
  }
];

let currentQuestionIndex = 0;
let userScore = 0;
let gameStarted = false;

router.get('/quiz', (req, res) => {
  if (!gameStarted) {
    gameStarted = true;
    currentQuestionIndex = 0;
    userScore = 0;
  }
  
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }
  
  const currentQuestion = triviaQuestions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const totalQuestions = triviaQuestions.length;
  
  const quizHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trivia Quiz Game</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                max-width: 800px;
                margin: 50px auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            .progress-bar {
                width: 100%;
                height: 20px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                margin: 20px 0;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(45deg, #4CAF50, #45a049);
                width: ${(questionNumber / totalQuestions) * 100}%;
                transition: width 0.3s ease;
            }
            .question-number {
                font-size: 1.2em;
                margin-bottom: 20px;
                color: #FFD700;
            }
            .question {
                font-size: 2em;
                margin: 30px 0;
                line-height: 1.4;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .answer-form {
                margin: 40px 0;
            }
            .answer-input {
                width: 80%;
                padding: 15px;
                border: none;
                border-radius: 25px;
                font-size: 18px;
                text-align: center;
                margin-bottom: 20px;
            }
            .submit-btn {
                background: linear-gradient(45deg, #4CAF50, #45a049);
                color: white;
                border: none;
                padding: 15px 40px;
                font-size: 18px;
                border-radius: 25px;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            .score-display {
                font-size: 1.3em;
                margin: 20px 0;
                color: #FFD700;
            }
            .restart-btn {
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                border: none;
                padding: 12px 25px;
                font-size: 16px;
                border-radius: 20px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
                transition: transform 0.2s;
            }
            .restart-btn:hover {
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🧠 Trivia Quiz Game 🧠</h1>
            
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            
            <div class="question-number">
                Question ${questionNumber} of ${totalQuestions}
            </div>
            
            <div class="score-display">
                Current Score: ${userScore}/${questionNumber - 1}
            </div>
            
            <div class="question">
                ${currentQuestion.question}
            </div>
            
            <form class="answer-form" action="/quiz" method="POST">
                <input type="text" 
                       class="answer-input" 
                       name="answer" 
                       placeholder="Type your answer here..." 
                       required 
                       autocomplete="off">
                <br>
                <button type="submit" class="submit-btn">Submit Answer 🚀</button>
            </form>
            
            <a href="/quiz" class="restart-btn">Restart Quiz</a>
        </div>
    </body>
    </html>
  `;
  
  res.send(quizHTML);
});

router.post('/quiz', (req, res) => {
  const { answer } = req.body;
  
  if (!answer || answer.trim().length === 0) {
    return res.redirect('/quiz');
  }
  
  const currentQuestion = triviaQuestions[currentQuestionIndex];
  const userAnswer = answer.trim();
  const correctAnswer = currentQuestion.answer;
  const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  
  if (isCorrect) {
    userScore++;
  }
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }
  
  const feedbackHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Answer Feedback - Trivia Quiz</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background: linear-gradient(135deg, ${isCorrect ? '#4CAF50' : '#ff6b6b'} 0%, ${isCorrect ? '#45a049' : '#ee5a24'} 100%);
                color: white;
                text-align: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            .result-emoji {
                font-size: 5em;
                margin: 20px 0;
                animation: ${isCorrect ? 'bounce' : 'shake'} 1s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            .result-text {
                font-size: 2em;
                margin: 20px 0;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .answer-details {
                background: rgba(255, 255, 255, 0.2);
                padding: 20px;
                border-radius: 10px;
                margin: 30px 0;
                font-size: 1.2em;
            }
            .next-btn {
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                border: none;
                padding: 15px 40px;
                font-size: 18px;
                border-radius: 25px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                margin-top: 20px;
                transition: transform 0.2s;
            }
            .next-btn:hover {
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="result-emoji">${isCorrect ? '🎉' : '❌'}</div>
            <div class="result-text">${isCorrect ? 'Correct!' : 'Incorrect!'}</div>
            
            <div class="answer-details">
                <p><strong>Your answer:</strong> ${userAnswer}</p>
                <p><strong>Correct answer:</strong> ${correctAnswer}</p>
                <p><strong>Current score:</strong> ${userScore}/${currentQuestionIndex}</p>
            </div>
            
            <a href="/quiz" class="next-btn">Next Question ➡️</a>
        </div>
    </body>
    </html>
  `;
  
  res.send(feedbackHTML);
});

router.get('/quiz/score', (req, res) => {
  const totalQuestions = triviaQuestions.length;
  const percentage = Math.round((userScore / totalQuestions) * 100);
  
  let scoreMessage = '';
  let scoreEmoji = '';
  
  if (percentage >= 80) {
    scoreMessage = 'Excellent! You\'re a trivia master!';
    scoreEmoji = '🏆';
  } else if (percentage >= 60) {
    scoreMessage = 'Good job! You know your stuff!';
    scoreEmoji = '🎯';
  } else if (percentage >= 40) {
    scoreMessage = 'Not bad! Keep learning!';
    scoreEmoji = '📚';
  } else {
    scoreMessage = 'Keep practicing! You\'ll get better!';
    scoreEmoji = '💪';
  }
  
  const scoreHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz Results - Trivia Quiz</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            .score-emoji {
                font-size: 6em;
                margin: 20px 0;
                animation: bounce 2s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
            .final-score {
                font-size: 3em;
                margin: 30px 0;
                color: #FFD700;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .score-message {
                font-size: 1.5em;
                margin: 20px 0;
                line-height: 1.4;
            }
            .score-details {
                background: rgba(255, 255, 255, 0.2);
                padding: 25px;
                border-radius: 15px;
                margin: 30px 0;
                font-size: 1.3em;
            }
            .restart-btn {
                background: linear-gradient(45deg, #4CAF50, #45a049);
                color: white;
                border: none;
                padding: 18px 40px;
                font-size: 18px;
                border-radius: 25px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                margin-top: 30px;
                transition: transform 0.2s;
            }
            .restart-btn:hover {
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="score-emoji">${scoreEmoji}</div>
            <h1>Quiz Complete! 🎉</h1>
            
            <div class="final-score">
                ${userScore}/${totalQuestions}
            </div>
            
            <div class="score-message">
                ${scoreMessage}
            </div>
            
            <div class="score-details">
                <p><strong>Correct answers:</strong> ${userScore}</p>
                <p><strong>Total questions:</strong> ${totalQuestions}</p>
                <p><strong>Percentage:</strong> ${percentage}%</p>
            </div>
            
            <a href="/quiz" class="restart-btn">Play Again! 🔄</a>
        </div>
    </body>
    </html>
  `;
  
  res.send(scoreHTML);
});

router.get('/', (req, res) => {
  res.redirect('/quiz');
});

module.exports = router;
