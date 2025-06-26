DROP TABLE IF EXISTS purchases;

CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    item_id INT REFERENCES items(id),
    quantity_purchased INT
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT id FROM items WHERE name ILIKE '%fan%'),
    1
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
    (SELECT id FROM items WHERE name ILIKE '%large desk%'),
    10
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
    (SELECT id FROM items WHERE name ILIKE '%small desk%'),
    2
);

SELECT * FROM items ORDER BY price ASC;
SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;
SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;
SELECT last_name FROM customers ORDER BY last_name DESC;
SELECT * FROM purchases;
SELECT purchases.*, customers.first_name, customers.last_name FROM purchases
JOIN customers ON purchases.customer_id = customers.id;
SELECT * FROM purchases WHERE customer_id = 5;

SELECT * FROM purchases
WHERE item_id IN (
    (SELECT id FROM items WHERE name ILIKE '%large desk%'),
    (SELECT id FROM items WHERE name ILIKE '%small desk%')
);

SELECT customers.first_name, customers.last_name, items.name
FROM purchases
JOIN customers ON purchases.customer_id = customers.id
JOIN items ON purchases.item_id = items.id;

INSERT INTO purchases (customer_id, quantity_purchased)
VALUES ((SELECT id FROM customers LIMIT 1), 1);

SELECT first_name, last_name FROM customers ORDER BY first_name ASC OFFSET (
    (SELECT COUNT(*) FROM customers) - 2
);

DELETE FROM purchases
WHERE customer_id = (
    SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'
);

SELECT * FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott';

SELECT purchases.id, customers.first_name, customers.last_name, purchases.item_id, purchases.quantity_purchased
FROM purchases
LEFT JOIN customers ON purchases.customer_id = customers.id;

SELECT purchases.id, customers.first_name, customers.last_name, purchases.item_id, purchases.quantity_purchased
FROM purchases
INNER JOIN customers ON purchases.customer_id = customers.id;
