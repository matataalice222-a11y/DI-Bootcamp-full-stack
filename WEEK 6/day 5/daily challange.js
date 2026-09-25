const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Emoji dataset
const emojis = [
  { emoji: "😀", name: "Smile" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🚗", name: "Car" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🏀", name: "Basketball" }
];

// Leaderboard + score tracking
let leaderboard = [];
let currentScore = 0;

// Utility: get random emoji with options
function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const correctEmoji = emojis[randomIndex];

  // Pick 3 random distractors
  let options = [correctEmoji.name];
  while (options.length < 4) {
    const randomOption = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(randomOption)) {
      options.push(randomOption);
    }
  }

  // Shuffle options
  options = options.sort(() => Math.random() - 0.5);

  return { emoji: correctEmoji.emoji, correct: correctEmoji.name, options };
}

// Route: Get new emoji challenge
app.get("/game", (req, res) => {
  const challenge = getRandomEmoji();
  res.json(challenge);
});

// Route: Submit guess
app.post("/guess", (req, res) => {
  const { guess, correct } = req.body;

  if (guess === correct) {
    currentScore++;
    res.json({ message: "✅ Correct!", score: currentScore });
  } else {
    res.json({ message: "❌ Wrong!", score: currentScore });
  }
});

// Route: Leaderboard
app.post("/leaderboard", (req, res) => {
  const { player } = req.body;
  leaderboard.push({ player, score: currentScore });
  leaderboard.sort((a, b) => b.score - a.score);
  res.json(leaderboard.slice(0, 5)); // top 5
});

// Start server
app.listen(3000, () => console.log("Emoji Game API running on port 3000"));
