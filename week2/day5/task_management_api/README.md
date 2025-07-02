# Task Management API

A simple RESTful API for managing users, projects, and tasks using Flask and PostgreSQL.

## Setup Instructions

1. **Clone or copy this folder**
2. **Create and activate a virtual environment**
   - Windows:
     ```
     python -m venv venv
     venv\Scripts\activate
     ```
   - Mac/Linux:
     ```
     python3 -m venv venv
     source venv/bin/activate
     ```
3. **Install dependencies**
   ```
   pip install -r requirements.txt
   ```
4. **Create a `.env` file** with your database credentials (see below).
5. **Run the app**
   ```
   python app.py
   ```

## .env Example
```
DB_HOST=localhost
DB_NAME=task_management_db
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=5432
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
```

## Features
- User, project, and task CRUD endpoints
- Raw SQL queries (no ORM)
- Basic error handling and validation
- JSON responses

## Testing
Use Postman, curl, or similar tools to test endpoints. 