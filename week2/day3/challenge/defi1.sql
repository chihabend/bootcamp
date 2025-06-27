CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE CustomerProfile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INTEGER UNIQUE REFERENCES Customer(id)
);

INSERT INTO Customer (first_name, last_name)
VALUES ('John', 'Doe'),
       ('Jerome', 'Lalu'),
       ('Lea', 'Rive');

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES
(TRUE, (SELECT id FROM Customer WHERE first_name = 'John')),
(FALSE, (SELECT id FROM Customer WHERE first_name = 'Jerome'));

SELECT c.first_name
FROM Customer c
JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;

SELECT c.first_name, cp.isLoggedIn
FROM Customer c
LEFT JOIN CustomerProfile cp ON c.id = cp.customer_id;

SELECT COUNT(*) AS not_logged_in_count
FROM Customer c
JOIN CustomerProfile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = FALSE;

CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);

CREATE TABLE Library (
    book_fk_id INTEGER REFERENCES Book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INTEGER REFERENCES Student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id)
);

INSERT INTO Book (title, author)
VALUES 
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

INSERT INTO Student (name, age)
VALUES 
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

INSERT INTO Library (book_fk_id, student_fk_id, borrowed_date)
VALUES 
((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM Student WHERE name = 'John'),
 '2022-02-15'),

((SELECT book_id FROM Book WHERE title = 'To kill a mockingbird'),
 (SELECT student_id FROM Student WHERE name = 'Bob'),
 '2021-03-03'),

((SELECT book_id FROM Book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM Student WHERE name = 'Lera'),
 '2021-05-23'),

((SELECT book_id FROM Book WHERE title = 'Harry Potter'),
 (SELECT student_id FROM Student WHERE name = 'Bob'),
 '2021-08-12');

SELECT * FROM Library;

SELECT s.name AS student_name, b.title AS book_title
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id;

SELECT AVG(s.age) AS avg_age
FROM Library l
JOIN Student s ON l.student_fk_id = s.student_id
JOIN Book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

DELETE FROM Student WHERE name = 'Bob';
