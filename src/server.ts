import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

import inquirer from 'inquirer';

await connectToDb();

const mainOptions = [
    'View All Employees', // 0
    'Add Employee', // 1
    'Update Employee Role', // 2
    'View All Roles', // 3
    'Add Role', // 4
    'View All Departments', // 5
    'Add Department', // 6
    'Quit', // 7
];

const addDeptOptions = [
    'What is the name of the department?', // 0
];

const addRoleOptions = [
    'What is the name of the role?', // 0
    'What is the salary of the role?', // 1
    'Which department does the role belong to?', // 2 // dropdown
];

const addEmplOptions = [
    'What is the employee\'s first name?', // 0
    'What is the employee\'s last  name?', // 1
    'What is the employee\'s role?', // 2 // dropdown
];

const updateEmplRoleOptions = [
    'Which employee\'s role do you want to update?', // 0 // dropdown
    'Which role do you want to assign the selected employee?', // 1 // dropdown
];

// calls main menu and then all other choices based on selection
function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: mainOptions,
                name: 'do',
            },
        ])
        .then((response) => {
            switch (response.do) {
                case mainOptions[0]: // VIEW ALL EMPLOYEES
                    viewAllEmployees();
                    break;
                case mainOptions[1]: // ADD EMPLOYEE
                    addEmployee();
                    break;
                case mainOptions[2]: // UPDATE EMPLOYEE ROLE
                    updateEmployeeRole();
                    break;
                case mainOptions[3]: // VIEW ALL ROLES
                    viewAllRoles();
                    break;
                case mainOptions[4]: // ADD ROLE
                    addRole();
                    break;
                case mainOptions[5]: // VIEW ALL DEPARTMENTS
                    viewAllDepts();
                    break;
                case mainOptions[6]:// ADD DEPARTMENT
                    addDept();
                    break;
                case mainOptions[7]: // QUIT
                    process.exit();
            }
        })
}

// done
function viewAllEmployees() {
    pool.query(
        `SELECT e1.first_name, e1.last_name, r.title, d.name AS department, r.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager 
        FROM roles AS r 
        JOIN departments AS d ON r.department_id = d.id 
        JOIN employees AS e1 ON r.id = e1.role_id LEFT OUTER JOIN employees AS e2 on e1.id = e2.manager_id ORDER BY r.id ASC`,
        (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
                menu();
            }
        })
};

// done
function viewAllRoles() {
    pool.query(
        `SELECT roles.title, departments.name AS department, roles.salary FROM roles 
        JOIN departments ON roles.department_id = departments.id`,
        (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
                menu();
            }
        })
};

// done
function viewAllDepts() {
    pool.query(
        'SELECT departments.name FROM departments',
        (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
                menu();
            }
        })
};

async function addEmployee() {
  const roles = await pool.query('SELECT id, title FROM roles');
  const rolesObject = roles.rows;
    inquirer
        .prompt([
            { // 0
                type: 'input',
                message: addEmplOptions[0], // firstname
                name: 'newEmployeeFirstName',
            },
            { // 1
                type: 'input',
                message: addEmplOptions[1], // lastname
                name: 'newEmployeeLastName',
            },
            { // 2
                type: 'list',
                message: addEmplOptions[2], // role
                choices: rolesObject.map(role => ({
                  name: role.title,
                  value: role.id
              })),
                name: 'newEmployeeRole',
            },
        ])
        .then((response) => {
            pool.query(
              'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)',
              [response.newEmployeeFirstName, response.newEmployeeLastName, response.newEmployeeRole],
              (err: Error, _result: QueryResult) => {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log(`Employee ${response.newEmployeeFirstName} ${response.newEmployeeLastName} added!`);
                      menu();
                  }
              })
        })
};

async function updateEmployeeRole() {
  const employees = await pool.query('SELECT id, CONCAT(e.first_name, \' \', e.last_name) AS full_name FROM employees AS e');
  const employeesObject = employees.rows;
  console.log(employeesObject);
  const roles = await pool.query('SELECT id, title FROM roles');
  const rolesObject = roles.rows;
  console.log(rolesObject);
    inquirer
        .prompt([
            {
                type: 'list',
                message: updateEmplRoleOptions[0], // employee
                choices: employeesObject.map(employee => ({
                  name: employee.full_name,
                  value: employee.id
              })),
                name: 'updatedEmployee',
            },
            {
                type: 'list',
                message: updateEmplRoleOptions[1], // role
                choices: rolesObject.map(role => ({
                  name: role.title,
                  value: role.id
              })),
                name: 'updatedEmployeeRole',
            },
        ])
        .then((response) => {
          // add console logs
          // console.log(response.updatedEmployeeRole);
          // console.log(response.updatedEmployee);
          // menu(); // remove when done
            pool.query(
              'UPDATE employees SET role_id = $1 WHERE id = $2',
              [response.updatedEmployeeRole, response.updatedEmployee],
              (err: Error, _result: QueryResult) => {
                  if (err) {
                      console.log(err);
                  } else {
                      // console.log(`Updated ${response.updatedEmployee}\'s role to ${response.updatedEmployeeRole}!`); //print name instead of numbers?
                      console.log(`Updated employee\'s role!`);
                      menu();
                  }
              })
        })
};

// done
async function addRole() {
    const depts = await pool.query('SELECT id, name FROM departments');
    const deptsObject = depts.rows;
    inquirer
        .prompt([
            { // 0
                type: 'input',
                message: addRoleOptions[0], // role 
                name: 'newRoleName',
            },
            { // 1
                type: 'input',
                message: addRoleOptions[1], // salary
                name: 'newRoleSalary',
            },
            { // 2
                type: 'list',
                message: addRoleOptions[2], // department
                choices: deptsObject.map(department => ({
                    name: department.name,
                    value: department.id
                })),
                name: 'newRoleDept',
            },
        ])
        .then((response) => {
            pool.query(
                'INSERT INTO roles (title, department_id, salary) VALUES ($1, $2, $3)',
                [response.newRoleName, response.newRoleDept, response.newRoleSalary],
                (err: Error, _result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newRoleName} role added!`);
                        menu();
                    }
                })
        })
};

// done
function addDept() {
    inquirer
        .prompt([
            { // 0
                type: 'input',
                message: addDeptOptions[0], // department
                name: 'newDeptName',
            },
        ])
        .then((response) => {
            pool.query(
                'INSERT INTO departments (name) VALUES ($1)',
                [response.newDeptName],
                (err: Error, _result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`${response.newDeptName} department added!`);
                        menu();
                    }
                })
        })
};


// Function call to initialize app
menu();
