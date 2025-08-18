const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async findAll() {
    const result = await db.query('SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await db.query('SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query('SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async createUserWithPassword(userData, password) {
    const client = await db.connect();
    
    try {
      await client.query('BEGIN');
      
      const userResult = await client.query(
        'INSERT INTO users (email, username, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [userData.email, userData.username, userData.first_name, userData.last_name]
      );
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await client.query(
        'INSERT INTO hashpwd (username, password) VALUES ($1, $2)',
        [userData.username, hashedPassword]
      );
      
      await client.query('COMMIT');
      
      return userResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async updateUser(id, userData) {
    const result = await db.query(
      'UPDATE users SET email = $1, username = $2, first_name = $3, last_name = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [userData.email, userData.username, userData.first_name, userData.last_name, id]
    );
    return result.rows[0];
  }

  static async verifyPassword(username, password) {
    const result = await db.query('SELECT password FROM hashpwd WHERE username = $1', [username]);
    
    if (result.rows.length === 0) {
      return false;
    }
    
    const hashedPassword = result.rows[0].password;
    return await bcrypt.compare(password, hashedPassword);
  }

  static async updatePassword(username, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await db.query(
      'UPDATE hashpwd SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2 RETURNING *',
      [hashedPassword, username]
    );
    return result.rows[0];
  }
}

module.exports = User;
