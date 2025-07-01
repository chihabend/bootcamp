import requests
import psycopg2
import random

def get_connection():
    return psycopg2.connect(
        dbname="restaurant",
        user="postgres",
        password="admin",
        host="localhost"
    )

def fetch_countries():
    url = "https://restcountries.com/v3.1/all"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return []

def insert_country(data):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO countries (name, capital, flag, subregion, population)
                VALUES (%s, %s, %s, %s, %s)
            """, data)
            conn.commit()

all_countries = fetch_countries()
random_countries = random.sample(all_countries, min(10, len(all_countries)))

for country in random_countries:
    name = country.get('name', {}).get('common', '')
    capital = country.get('capital', [''])[0] if country.get('capital') else ''
    flag = country.get('flags', {}).get('png', '')
    subregion = country.get('subregion', '')
    population = country.get('population', 0)
    insert_country((name, capital, flag, subregion, population))
