const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  getQuestionById,
  checkAnswer
} = require('../controllers/quizController');

router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.post('/check', checkAnswer);

module.exports = router;
