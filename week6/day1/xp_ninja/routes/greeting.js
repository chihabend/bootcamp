const express = require('express');
const router = express.Router();

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

router.get('/', (req, res) => {
  const formHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Emoji Greeting App</title>
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
                padding: 30px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
            h1 {
                margin-bottom: 30px;
                font-size: 2.5em;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .form-group {
                margin-bottom: 20px;
                text-align: left;
            }
            label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                font-size: 1.1em;
            }
            input[type="text"] {
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                box-sizing: border-box;
            }
            .emoji-options {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin: 20px 0;
                flex-wrap: wrap;
            }
            .emoji-option {
                font-size: 2em;
                cursor: pointer;
                padding: 10px;
                border-radius: 50%;
                transition: transform 0.2s, background-color 0.2s;
            }
            .emoji-option:hover {
                transform: scale(1.2);
                background-color: rgba(255, 255, 255, 0.2);
            }
            .emoji-option.selected {
                background-color: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
            button {
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 18px;
                border-radius: 25px;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
                margin-top: 20px;
            }
            button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            .error {
                color: #ff6b6b;
                background: rgba(255, 107, 107, 0.1);
                padding: 10px;
                border-radius: 8px;
                margin: 10px 0;
                display: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌟 Emoji Greeting App 🌟</h1>
            <form action="/greet" method="POST" id="greetingForm">
                <div class="form-group">
                    <label for="name">Enter your name:</label>
                    <input type="text" id="name" name="name" placeholder="Your name here..." required>
                </div>
                
                <div class="form-group">
                    <label>Choose an emoji:</label>
                    <div class="emoji-options">
                        ${emojis.map((emoji, index) => `
                            <div class="emoji-option" data-emoji="${emoji}" onclick="selectEmoji(this, '${emoji}')">
                                ${emoji}
                            </div>
                        `).join('')}
                    </div>
                    <input type="hidden" id="selectedEmoji" name="emoji" value="${emojis[0]}">
                </div>
                
                <div class="error" id="errorMessage"></div>
                
                <button type="submit">Generate Greeting! 🎉</button>
            </form>
        </div>
        
        <script>
            function selectEmoji(element, emoji) {
                document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
                element.classList.add('selected');
                document.getElementById('selectedEmoji').value = emoji;
            }
            
            document.getElementById('greetingForm').addEventListener('submit', function(e) {
                const name = document.getElementById('name').value.trim();
                const errorDiv = document.getElementById('errorMessage');
                
                if (!name) {
                    e.preventDefault();
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = 'Please enter your name!';
                    return;
                }
                
                errorDiv.style.display = 'none';
            });
            
            document.querySelector('.emoji-option').classList.add('selected');
        </script>
    </body>
    </html>
  `;
  
  res.send(formHTML);
});

router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;
  
  if (!name || name.trim().length === 0) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error - Emoji Greeting App</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  max-width: 600px;
                  margin: 50px auto;
                  padding: 20px;
                  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                  color: white;
                  text-align: center;
              }
              .container {
                  background: rgba(255, 255, 255, 0.1);
                  padding: 30px;
                  border-radius: 15px;
                  backdrop-filter: blur(10px);
              }
              .error-emoji {
                  font-size: 4em;
                  margin: 20px 0;
              }
              a {
                  color: white;
                  text-decoration: none;
                  background: rgba(255, 255, 255, 0.2);
                  padding: 10px 20px;
                  border-radius: 25px;
                  display: inline-block;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="error-emoji">❌</div>
              <h1>Oops! Something went wrong</h1>
              <p>Please enter your name to continue.</p>
              <a href="/">Go Back</a>
          </div>
      </body>
      </html>
    `);
  }
  
  const selectedEmoji = emojis.includes(emoji) ? emoji : emojis[0];
  const greetingHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Greeting - Emoji Greeting App</title>
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
            .greeting-emoji {
                font-size: 5em;
                margin: 20px 0;
                animation: bounce 2s infinite;
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
            h1 {
                margin-bottom: 20px;
                font-size: 2.5em;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .message {
                font-size: 1.3em;
                margin: 30px 0;
                line-height: 1.6;
            }
            a {
                color: white;
                text-decoration: none;
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                padding: 15px 30px;
                border-radius: 25px;
                display: inline-block;
                margin-top: 30px;
                transition: transform 0.2s;
            }
            a:hover {
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="greeting-emoji">${selectedEmoji}</div>
            <h1>Hello, ${name}! 👋</h1>
            <div class="message">
                Welcome to our amazing Emoji Greeting App!<br>
                We're so excited to see you here ${selectedEmoji}
            </div>
            <a href="/">Create Another Greeting</a>
        </div>
    </body>
    </html>
  `;
  
  res.send(greetingHTML);
});

module.exports = router;
