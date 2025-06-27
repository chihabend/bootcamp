SELECT f.film_id, f.title, f.rating
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id AND r.return_date IS NULL
WHERE f.rating IN ('G', 'PG') AND r.rental_id IS NULL
GROUP BY f.film_id, f.title, f.rating;

CREATE TABLE kids_waitlist (
    waitlist_id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES film(film_id),
    child_name VARCHAR(50) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO kids_waitlist (film_id, child_name) VALUES (1, 'Alice');
INSERT INTO kids_waitlist (film_id, child_name) VALUES (1, 'Bob');
INSERT INTO kids_waitlist (film_id, child_name) VALUES (2, 'Charlie');
SELECT f.title, COUNT(kw.waitlist_id) AS waitlist_count
FROM kids_waitlist kw
JOIN film f ON kw.film_id = f.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.title
ORDER BY waitlist_count DESC;
