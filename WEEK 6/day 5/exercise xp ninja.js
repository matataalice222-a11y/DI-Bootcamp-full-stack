const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Dickens", "Tolstoy", "Homer"],
    answer: "Shakespeare"
  }
];

let currentScore = 0;
let currentQuestionIndex = 0;

// Get next question
app.get("/api/question", (req, res) => {
  if (currentQuestionIndex < questions.length) {
    const q = questions[currentQuestionIndex];
    res.json({ question: q.question, options: q.options });
  } else {
    res.json({ message: "Quiz finished!", score: currentScore });
  }
});

// Submit answer
app.post("/api/answer", (req, res) => {
  const { answer } = req.body;
  const q = questions[currentQuestionIndex];

  if (answer === q.answer) {
    currentScore++;
    res.json({ correct: true, score: currentScore });
  } else {
    res.json({ correct: false, score: currentScore });
  }

  currentQuestionIndex++;
});

// Reset quiz
app.post("/api/reset", (req, res) => {
  currentScore = 0;
  currentQuestionIndex = 0;
  res.json({ message: "Quiz reset!" });
});

app.listen(3000, () => console.log("Quiz Game running on port 3000"));
