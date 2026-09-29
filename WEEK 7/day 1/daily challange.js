const express = require('express');
const router = express.Router();

// Hard-coded trivia questions
const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" }
];

// Game state (in-memory)
let currentQuestionIndex = 0;
let score = 0;

// ✅ GET /quiz - Start quiz and show first question
router.get('/', (req, res) => {
  if (currentQuestionIndex < triviaQuestions.length) {
    const q = triviaQuestions[currentQuestionIndex];
    res.json({ question: q.question });
  } else {
    res.json({ message: "Quiz finished! Go to /quiz/score to see your score." });
  }
});

// ✅ POST /quiz - Submit answer and move to next question
router.post('/', (req, res) => {
  const { answer } = req.body;

  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.json({ message: "Quiz already finished! Go to /quiz/score." });
  }

  const currentQuestion = triviaQuestions[currentQuestionIndex];
  let feedback;

  if (answer && answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    score++;
    feedback = "✅ Correct!";
  } else {
    feedback = `❌ Wrong! The correct answer was: ${currentQuestion.answer}`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < triviaQuestions.length) {
    res.json({
      feedback,
      nextQuestion: triviaQuestions[currentQuestionIndex].question,
      score
    });
  } else {
    res.json({
      feedback,
      message: "Quiz finished! Go to /quiz/score to see your score.",
      score
    });
  }
});

// ✅ GET /quiz/score - Show final score
router.get('/score', (req, res) => {
  res.json({
    message: "Final Score",
    score,
    totalQuestions: triviaQuestions.length
  });

  // Reset game state for replay
  currentQuestionIndex = 0;
  score = 0;
});

module.exports = router;
