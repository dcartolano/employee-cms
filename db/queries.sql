
-- all departments table
SELECT departments.name FROM departments;

-- all roles table
SELECT
roles.title, departments.name AS department, roles.salary FROM roles
JOIN departments ON roles.department_id = departments.id;

-- all employees table
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
