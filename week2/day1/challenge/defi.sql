CREATE TABLE actors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

SELECT COUNT(*) FROM actors;

INSERT INTO actors (first_name, last_name)
VALUES (NULL, NULL);

INSERT INTO actors (first_name, last_name)
VALUES ('Bruce', 'Wayne');

SELECT * FROM actors;
