from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Debug print to check if DB_PASSWORD is loaded
print('DB_PASSWORD:', os.getenv('DB_PASSWORD'))

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'port': os.getenv('DB_PORT')
}

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running'
    }), 200

# Database connection test endpoint
@app.route('/db-test', methods=['GET'])
def db_test():
    try:
        # Only keep valid psycopg2.connect parameters
        valid_keys = {'host', 'database', 'user', 'password', 'port'}
        db_config_clean = {k: v for k, v in DB_CONFIG.items() if k in valid_keys and v is not None}
        port = None
        if 'port' in db_config_clean:
            try:
                port = int(db_config_clean['port'])
            except (ValueError, TypeError):
                return jsonify({'db_status': 'failure', 'message': 'Invalid port value'}), 500
        conn = psycopg2.connect(
            host=db_config_clean.get('host'),
            database=db_config_clean.get('database'),
            user=db_config_clean.get('user'),
            password=db_config_clean.get('password'),
            port=port if port is not None else None
        )
        conn.close()
        return jsonify({'db_status': 'success', 'message': 'Connected to the database successfully!'}), 200
    except Exception as e:
        return jsonify({'db_status': 'failure', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 