DROP TABLE IF EXISTS FirstTab;
CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
);

INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar');

SELECT * FROM FirstTab;

DROP TABLE IF EXISTS SecondTab;
CREATE TABLE SecondTab (
    id integer 
);

INSERT INTO SecondTab VALUES
(5),
(NULL);

SELECT * FROM SecondTab;
