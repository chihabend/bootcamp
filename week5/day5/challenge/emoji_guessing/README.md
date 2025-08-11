# 🎮 Emoji Guessing Game

A fun and interactive emoji guessing game built with Express.js and vanilla JavaScript!

## 🚀 Features

- **Random Emoji Generation**: Each round presents a new random emoji to guess
- **Multiple Choice Options**: 4 options per round with shuffled answers
- **Score Tracking**: Keep track of your correct guesses
- **Leaderboard System**: Compete with other players for the highest score
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Feedback**: Immediate feedback on correct/incorrect answers

## 🛠️ Technologies Used

- **Backend**: Express.js (Node.js)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **API**: RESTful API with Fetch API for communication

## 📋 Requirements

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🚀 Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd week5/day5/challenge/emoji_guessing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

## 🎯 How to Play

1. **Enter Your Name**: Type your name in the input field to start playing
2. **Guess the Emoji**: Look at the displayed emoji and choose the correct name from the 4 options
3. **Get Feedback**: See if your answer was correct or incorrect
4. **Track Your Score**: Your score increases with each correct guess
5. **Compete**: Try to get the highest score and make it to the leaderboard!
6. **Next Round**: Click "Next Round" to continue playing with a new emoji

## 🏆 Game Features

### Core Gameplay
- Random emoji selection from a curated collection
- 4 multiple choice options per round
- Immediate feedback on answers
- Score tracking throughout the session

### Leaderboard System
- Top 10 scores are saved
- Real-time leaderboard updates
- Persistent scoring across game sessions

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Clear visual feedback for correct/incorrect answers
- Intuitive interface

## 🎨 Emoji Collection

The game includes 20 carefully selected emojis covering various categories:
- 😀 Smile
- 🐶 Dog
- 🌮 Taco
- 🍕 Pizza
- 🚗 Car
- 🏠 House
- 🌙 Moon
- ☀️ Sun
- 🌺 Flower
- 🐱 Cat
- 🍎 Apple
- ⚽ Soccer Ball
- 🎸 Guitar
- 📱 Phone
- 💻 Laptop
- 🎮 Game Controller
- 🎨 Paint Palette
- 📚 Books
- 🎭 Theater Masks
- 🚀 Rocket

## 🔧 API Endpoints

- `GET /` - Serve the main game page
- `GET /api/game` - Get a new random emoji game
- `POST /api/guess` - Submit a player's guess
- `GET /api/leaderboard` - Get current leaderboard
- `POST /api/reset` - Reset the current game

## 🎯 Advanced Features (Future Enhancements)

- Time limits for each guess
- User authentication system
- Difficulty levels
- Hint system
- Sound effects
- More emoji categories

## 🐛 Troubleshooting

If you encounter any issues:

1. **Port already in use**: Make sure port 3000 is available
2. **Dependencies not found**: Run `npm install` again
3. **Server won't start**: Check that Node.js is properly installed

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

Feel free to enhance the game with new features:
- Add more emojis
- Implement new game modes
- Improve the UI/UX
- Add sound effects
- Create difficulty levels

## 📄 License

This project is part of a coding bootcamp exercise.

---

**Enjoy playing the Emoji Guessing Game! 🎉**
