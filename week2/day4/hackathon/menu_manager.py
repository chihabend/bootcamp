import psycopg2

class MenuManager:

    @classmethod
    def get_by_name(cls, name):
        with psycopg2.connect(dbname='restaurant', user='postgres', password='admin', host='localhost') as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM Menu_Items WHERE item_name = %s", (name,))
                item = cur.fetchone()
                if item:
                    return {'item_id': item[0], 'item_name': item[1], 'item_price': item[2]}
                return None

    @classmethod
    def all_items(cls):
        with psycopg2.connect(dbname='restaurant', user='postgres', password='admin', host='localhost') as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM Menu_Items")
                items = cur.fetchall()
                return [{'item_id': item[0], 'item_name': item[1], 'item_price': item[2]} for item in items]
