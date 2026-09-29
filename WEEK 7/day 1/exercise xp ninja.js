const express = require('express');
const router = express.Router();

// List of available emojis
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// ✅ GET / - Display form
router.get('/', (req, res) => {
  let form = `
    <html>
      <head>
        <title>Emoji Greeting App</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          form { margin: 20px auto; display: inline-block; }
          select, input { padding: 8px; margin: 5px; }
          button { padding: 10px 15px; background: #4CAF50; color: white; border: none; cursor: pointer; }
          button:hover { background: #45a049; }
        </style>
      </head>
      <body>
        <h1>Emoji Greeting App 🎨</h1>
        <form action="/greet" method="POST">
          <label for="name">Enter your name:</label><br>
          <input type="text" id="name" name="name" required><br><br>
          
          <label for="emoji">Choose an emoji:</label><br>
          <select id="emoji" name="emoji">
            ${emojis.map(e => `<option value="${e}">${e}</option>`).join('')}
          </select><br><br>
          
          <button type="submit">Greet Me!</button>
        </form>
      </body>
    </html>
  `;
  res.send(form);
});

// ✅ POST /greet - Process form submission
router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("<h2>Error: Name is required!</h2>");
  }

  const greeting = `
    <html>
      <head>
        <title>Greeting</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          h1 { color: #333; }
          .emoji { font-size: 3rem; }
        </style>
      </head>
      <body>
        <h1>Hello, ${name}! ${emoji}</h1>
        <p class="emoji">${emoji}</p>
        <a href="/">Go Back</a>
      </body>
    </html>
  `;
  res.send(greeting);
});

module.exports = router;
