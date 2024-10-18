
INSERT INTO departments (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, department_id, salary)
VALUES ('Sales Lead', 1, 100000),
       ('Salesperson', 1, 80000),
       ('Lead Engineer', 2, 150000),
       ('Software Engineer', 2, 120000),
       ('Account Manager', 3, 160000),
       ('Accountant', 3, 125000),
       ('Legal Team Lead', 4, 250000),
       ('Lawyer', 4, 190000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Pork', 1, null),
       ('Bridgett', 'Johnson', 2, 1),
       ('Ashley', 'Stranded', 3, null),
       ('Jorge', 'Harrison', 4, 3),
       ('Victor', 'Vega', 5, null),
       ('Peter', 'Gabriel', 6, 5),
       ('Gary', 'Tang', 7, null),
       ('Jason', 'Parse', 8, 7);