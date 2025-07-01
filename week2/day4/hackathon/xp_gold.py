import psycopg2
import bcrypt

def get_connection():
    return psycopg2.connect(
        dbname="restaurant",
        user="postgres",
        password="admin",
        host="localhost"
    )

def get_user(username):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT password FROM users WHERE username = %s", (username,))
            return cur.fetchone()

def create_user(username, password):
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed))
            conn.commit()

logged_in = None

while True:
    action = input("Enter 'login', 'exit': ").strip().lower()

    if action == 'exit':
        break

    elif action == 'login':
        username = input("Username: ")
        password = input("Password: ")
        user = get_user(username)

        if user and bcrypt.checkpw(password.encode(), user[0].encode()):
            print("You are now logged in.")
            logged_in = username
        else:
            print("User not found or wrong password.")
            signup = input("Do you want to sign up? (yes/no): ").strip().lower()
            if signup == 'yes':
                while True:
                    new_username = input("Choose a username: ")
                    if get_user(new_username):
                        print("Username already taken.")
                    else:
                        break
                new_password = input("Choose a password: ")
                create_user(new_username, new_password)
                print("User registered successfully.")
