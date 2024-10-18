
-- for viewAllEmployees()
SELECT
e1.first_name, 
e1.last_name, 
r.title, 
d.name AS department, 
r.salary,
CONCAT(e2.first_name, ' ',
e2.last_name) AS manager
FROM roles AS r
JOIN departments AS d ON r.department_id = d.id
JOIN employees AS e1 ON r.id = e1.role_id
LEFT OUTER JOIN employees AS e2 on e1.id = e2.manager_id
ORDER BY r.id ASC;

-- for addEmployee()
SELECT id, title FROM roles;

INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3);

-- for updateEmployeeRole()
SELECT id, CONCAT(e.first_name, \' \', e.last_name) AS full_name FROM employees AS e;

SELECT id, title FROM roles;

UPDATE employees SET role_id = $1 WHERE id = $2;

-- for viewAllRoles()
SELECT
roles.title, departments.name AS department, roles.salary FROM roles
JOIN departments ON roles.department_id = departments.id;

-- for addRole()
SELECT id, name FROM departments;

INSERT INTO roles (title, department_id, salary) VALUES ($1, $2, $3);

-- for viewAllDepts()
SELECT departments.name FROM departments;

-- addDept()
INSERT INTO departments (name) VALUES ($1);
