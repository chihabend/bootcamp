CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  item_id INTEGER REFERENCES items(id),
  quantity_purchased INTEGER
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
  (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
  (SELECT id FROM items WHERE name = 'fan'),
  1
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
  (SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
  (SELECT id FROM items WHERE name = 'large desk'),
  10
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
  (SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
  (SELECT id FROM items WHERE name = 'small desk'),
  2
);
