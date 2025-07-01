import psycopg2

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def save(self):
        with psycopg2.connect(dbname='restaurant', user='postgres', password='admin', host='localhost') as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)",
                    (self.name, self.price)
                )
                print(f"{self.name} was added successfully.")

    def delete(self):
        with psycopg2.connect(dbname='restaurant', user='postgres', password='admin', host='localhost') as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM Menu_Items WHERE item_name = %s", (self.name,))
                if cur.rowcount:
                    print(f"{self.name} was deleted successfully.")
                else:
                    print(f"{self.name} not found. No deletion made.")

    def update(self, new_name, new_price):
        with psycopg2.connect(dbname='restaurant', user='postgres', password='admin', host='localhost') as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s",
                    (new_name, new_price, self.name)
                )
                if cur.rowcount:
                    print(f"{self.name} was updated to {new_name}, {new_price}")
                else:
                    print(f"{self.name} not found. No update made.")
