const db = require('../config/database');

class Quiz {
  static async getAllQuestions() {
    const result = await db.query(`
      SELECT 
        q.id,
        q.question,
        q.correct_answer,
        array_agg(o.option) as options
      FROM questions q
      JOIN questions_options qo ON q.id = qo.question_id
      JOIN options o ON qo.option_id = o.id
      GROUP BY q.id, q.question, q.correct_answer
      ORDER BY q.id
    `);
    return result.rows;
  }

  static async getQuestionById(id) {
    const result = await db.query(`
      SELECT 
        q.id,
        q.question,
        q.correct_answer,
        array_agg(o.option) as options
      FROM questions q
      JOIN questions_options qo ON q.id = qo.question_id
      JOIN options o ON qo.option_id = o.id
      WHERE q.id = $1
      GROUP BY q.id, q.question, q.correct_answer
    `, [id]);
    return result.rows[0];
  }

  static async checkAnswer(questionId, userAnswer) {
    const result = await db.query(
      'SELECT correct_answer FROM questions WHERE id = $1',
      [questionId]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const correctAnswer = result.rows[0].correct_answer;
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  }
}

module.exports = Quiz;
