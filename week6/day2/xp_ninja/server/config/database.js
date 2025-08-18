const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quiz_db',
  password: 'password',
  port: 5432,
});

const createQuizTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        correct_answer VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS options (
        id SERIAL PRIMARY KEY,
        option TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS questions_options (
        question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
        option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
        PRIMARY KEY (question_id, option_id)
      )
    `);

    await pool.query(`
      INSERT INTO questions (question, correct_answer) VALUES
      ('What is the capital of France?', 'Paris'),
      ('Which planet is known as the Red Planet?', 'Mars'),
      ('What is the largest mammal in the world?', 'Blue whale')
      ON CONFLICT DO NOTHING
    `);

    await pool.query(`
      INSERT INTO options (option) VALUES
      ('Paris'), ('London'), ('Berlin'), ('Madrid'),
      ('Mars'), ('Venus'), ('Jupiter'), ('Saturn'),
      ('Blue whale'), ('Elephant'), ('Giraffe'), ('Hippo')
      ON CONFLICT DO NOTHING
    `);

    await pool.query(`
      INSERT INTO questions_options (question_id, option_id) VALUES
      (1, 1), (1, 2), (1, 3), (1, 4),
      (2, 5), (2, 6), (2, 7), (2, 8),
      (3, 9), (3, 10), (3, 11), (3, 12)
      ON CONFLICT DO NOTHING
    `);

    console.log('Quiz tables created successfully');
  } catch (error) {
    console.error('Error creating quiz tables:', error);
  }
};

createQuizTables();

module.exports = pool;
