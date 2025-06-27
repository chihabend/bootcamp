SELECT * FROM language;

SELECT film.title, film.description, language.name
FROM film
JOIN language ON film.language_id = language.language_id;

SELECT film.title, film.description, language.name
FROM language
LEFT JOIN film ON film.language_id = language.language_id;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO new_film (name) VALUES
('The Blue Mystery'),
('Ghost of Sahara');

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER REFERENCES language(language_id),
    title VARCHAR(255),
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(1, 1, 'Amazing Movie', 9, 'Very entertaining and well made.'),
(2, 2, 'Not Bad', 7, 'Interesting plot with great acting.');

DELETE FROM new_film WHERE id = 1;

UPDATE film SET language_id = 3 WHERE film_id = 1;
UPDATE film SET language_id = 2 WHERE film_id = 2;

SELECT conname, confrelid::regclass AS referenced_table
FROM pg_constraint
WHERE conrelid = 'customer'::regclass;

DROP TABLE customer_review;

SELECT COUNT(*) FROM rental WHERE return_date IS NULL;

SELECT film.title, film.rental_rate
FROM rental
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
WHERE rental.return_date IS NULL
ORDER BY film.rental_rate DESC
LIMIT 30;

SELECT film.title
FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON actor.actor_id = film_actor.actor_id
WHERE actor.first_name = 'Penelope' AND actor.last_name = 'Monroe'
AND film.description ILIKE '%sumo%';

SELECT title
FROM film
WHERE length < 60 AND rating = 'R';

SELECT film.title
FROM payment
JOIN rental ON payment.rental_id = rental.rental_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
JOIN customer ON payment.customer_id = customer.customer_id
WHERE customer.first_name = 'Matthew' AND customer.last_name = 'Mahan'
AND payment.amount > 4.00
AND rental.return_date BETWEEN '2005-07-28' AND '2005-08-01';

SELECT film.title
FROM film
JOIN inventory ON film.film_id = inventory.film_id
JOIN rental ON inventory.inventory_id = rental.inventory_id
JOIN customer ON rental.customer_id = customer.customer_id
WHERE customer.first_name = 'Matthew' AND customer.last_name = 'Mahan'
AND (film.title ILIKE '%boat%' OR film.description ILIKE '%boat%')
ORDER BY film.replacement_cost DESC;
