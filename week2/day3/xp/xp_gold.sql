SELECT * FROM rental WHERE return_date IS NULL;

SELECT customer_id, COUNT(*) 
FROM rental 
WHERE return_date IS NULL 
GROUP BY customer_id;

SELECT f.title 
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON a.actor_id = fa.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON c.category_id = fc.category_id
WHERE a.first_name = 'Joe' AND a.last_name = 'Swank' AND c.name = 'Action';

--ex2
SELECT store.store_id, city.city, country.country 
FROM store 
JOIN address ON store.address_id = address.address_id 
JOIN city ON address.city_id = city.city_id 
JOIN country ON city.country_id = country.country_id;

SELECT store_id, SUM(film.length) AS total_minutes
FROM inventory
JOIN film ON inventory.film_id = film.film_id
LEFT JOIN rental ON inventory.inventory_id = rental.inventory_id
WHERE rental.return_date IS NOT NULL OR rental.rental_id IS NULL
GROUP BY store_id;

SELECT DISTINCT customer.*
FROM customer 
JOIN address ON customer.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
WHERE city.city_id IN (
  SELECT city_id 
  FROM address 
  WHERE address_id IN (SELECT address_id FROM store)
);

SELECT DISTINCT customer.*
FROM customer 
JOIN address ON customer.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id
WHERE country.country_id IN (
  SELECT country_id 
  FROM city 
  WHERE city_id IN (
    SELECT city_id 
    FROM address 
    WHERE address_id IN (SELECT address_id FROM store)
  )
);

SELECT SUM(length) AS safe_minutes,
       SUM(length)/60.0 AS safe_hours,
       SUM(length)/60.0/24.0 AS safe_days
FROM film
WHERE film_id NOT IN (
  SELECT film_id 
  FROM film_category fc
  JOIN category c ON fc.category_id = c.category_id 
  WHERE c.name = 'Horror'
)
AND title NOT ILIKE '%beast%'
AND title NOT ILIKE '%monster%'
AND title NOT ILIKE '%ghost%'
AND title NOT ILIKE '%dead%'
AND title NOT ILIKE '%zombie%'
AND title NOT ILIKE '%undead%'
AND description NOT ILIKE '%beast%'
AND description NOT ILIKE '%monster%'
AND description NOT ILIKE '%ghost%'
AND description NOT ILIKE '%dead%'
AND description NOT ILIKE '%zombie%'
AND description NOT ILIKE '%undead%';

