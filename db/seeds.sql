
INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- CREATE TABLE roles (
--   id SERIAL PRIMARY KEY,
--   title VARCHAR(30) NOT NULL,
--   department_id INTEGER NOT NULL
--   salary DECIMAL NOT NULL,
--   -- LINK TO DEPARTMENTS TABLE?
-- );


INSERT INTO roles (title, department_id, salary)
VALUES ('Sales Lead', 'Sales', 100000),
       ('Salesperson', 'Sales', 80000),
       ('Lead Engineer', 'Engineering', 150000),
       ('Software Engineer', 'Engineering', 120000),
       ('Account Manager', 'Finance', 160000),
       ('Accountant', 'Finance', 125000),
       ('Legal Team Lead', 'Legal', 250000),
       ('Lawyer', 'Legal', 190000);

-- CREATE TABLE employees (
--   id SERIAL PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   role_id INTEGER NOT NULL,
--   manager_id INTEGER
--   -- LINK TO DEPARTMENTS TABLE?
--   -- LINK TO ROLES TABLE?
-- );

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1),
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriguez', 3),
       ('Kevin', 'Tupik', 4, 3),
       ('Kunal', 'Singh', 5),
       ('Malia', 'Brown', 6, 5),
       ('Sarah', 'Lourd', 7),
       ('Tom', 'Allen', 8, 7);