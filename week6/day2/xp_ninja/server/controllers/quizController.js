const Quiz = require('../models/Quiz');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Quiz.getAllQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Quiz.getQuestionById(id);
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch question' });
  }
};

const checkAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    
    if (!questionId || !answer) {
      return res.status(400).json({ error: 'Question ID and answer are required' });
    }
    
    const isCorrect = await Quiz.checkAnswer(questionId, answer);
    
    if (isCorrect === null) {
      return res.status(404).json({ error: 'Question not found' });
    }
    
    res.json({ 
      isCorrect,
      message: isCorrect ? 'Correct!' : 'Incorrect!'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check answer' });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  checkAnswer
};
