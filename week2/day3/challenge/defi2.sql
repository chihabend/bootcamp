CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL
);

CREATE TABLE product_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    order_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    order_id INTEGER REFERENCES product_orders(id)
);

INSERT INTO users (username) VALUES ('alice'), ('bob');

INSERT INTO product_orders (user_id) VALUES 
((SELECT id FROM users WHERE username = 'alice')),
((SELECT id FROM users WHERE username = 'bob'));

INSERT INTO items (name, price, order_id) VALUES 
('Book', 15.99, 1),
('Pen', 2.50, 1),
('Laptop', 799.99, 2),
('Mouse', 25.00, 2);

CREATE OR REPLACE FUNCTION get_order_total(order_id_input INTEGER)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC(10,2);
BEGIN
    SELECT SUM(price) INTO total
    FROM items
    WHERE order_id = order_id_input;
    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_order_total(user_id_input INTEGER, order_id_input INTEGER)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC(10,2);
BEGIN
    SELECT SUM(i.price) INTO total
    FROM items i
    JOIN product_orders po ON i.order_id = po.id
    WHERE po.id = order_id_input AND po.user_id = user_id_input;
    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;
