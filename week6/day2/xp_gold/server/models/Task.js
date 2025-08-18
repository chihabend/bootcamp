const db = require('../config/database');

class Task {
  static async findAll() {
    const result = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(title) {
    const result = await db.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );
    return result.rows[0];
  }

  static async update(id, title, completed) {
    const result = await db.query(
      'UPDATE tasks SET title = $1, completed = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, completed, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Task;
