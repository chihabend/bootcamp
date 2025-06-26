SELECT rating, COUNT(*) FROM film GROUP BY rating;

SELECT * FROM film WHERE rating IN ('G', 'PG-13') AND length < 120 AND rental_rate < 3.00 ORDER BY title;

UPDATE customer SET first_name = 'TonPrenom', last_name = 'TonNom' WHERE customer_id = 1;

UPDATE address SET address = '123 Rue Exemple', district = 'MonDistrict', postal_code = '75000', phone = '0102030405'
WHERE address_id = (SELECT address_id FROM customer WHERE customer_id = 1);
