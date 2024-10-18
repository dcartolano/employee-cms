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

function viewAllEmployees() {
    pool.query(
        `SELECT e1.first_name, e1.last_name, r.title, d.name AS department, r.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM roles AS r JOIN departments AS d ON r.department_id = d.id JOIN employees AS e1 ON r.id = e1.role_id LEFT OUTER JOIN employees AS e2 on e1.id = e2.manager_id ORDER BY r.id ASC`,
        (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
                menu();
            }
        })
};

function viewAllRoles() {
    pool.query(
        `SELECT roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id`,
        (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
                menu();
            }
        })
};

function viewAllDepts() {
    pool.query(
        `SELECT departments.name FROM departments`,
        (err: Error, result: QueryResult) => {
            if (err) {
                console.log(err);
            } else {
                console.table(result.rows);
                menu();
            }
        })
};

function addEmployee() {
    inquirer
        .prompt([
            { // 0
                type: 'input',
                message: addEmplOptions[0], // firstname
                name: 'firstName',
            },
            { // 1
                type: 'input',
                message: addEmplOptions[1], // lastname
                name: 'lastName',
            },
            { // 2
                type: 'list',
                message: addEmplOptions[2], // role
                choices: ['test', 'test'], // need to update
                name: 'employeeRole',
            },
        ])
        .then((response) => {
            // pool.query(
            //     `${response}`,
            //     (err: Error, _result: QueryResult) => {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log(`Employee added`);
            //             menu();
            //         }
            //     })
            console.log(response); // remove once above is working
            menu(); // remove once above is working
        })
};

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: updateEmplRoleOptions[0], // which e
                choices: mainOptions, // need to update
                name: 'employee',
            },
            {
                type: 'list',
                message: updateEmplRoleOptions[1], // which r
                choices: mainOptions, // need to update
                name: 'emplRole',
            },
        ])
        .then((response) => {
            // pool.query(
            //     `${response}`,
            //     (err: Error, _result: QueryResult) => {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log(`Updated employee\'s role`);
            //             menu();
            //         }
            //     })
            console.log(response); // remove once above is complete
            menu(); // remove once above is complete
        })
};

async function addRole() {
    const depts = await pool.query('SELECT id, name FROM departments');
    const deptsObject = depts.rows;
    console.log(deptsObject);
    inquirer
        .prompt([
            { // 0
                type: 'input',
                message: addRoleOptions[0], // role name
                name: 'newRoleName',
            },
            { // 1
                type: 'input',
                message: addRoleOptions[1], // role salary
                name: 'newRoleSalary',
            },
            { // 2
                type: 'list',
                message: addRoleOptions[2], // role dept
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

function addDept() {
    inquirer
        .prompt([
            { // 0
                type: 'input',
                message: addDeptOptions[0], // department name
                name: 'deptName',
            },
        ])
        .then((response) => {
            pool.query(
                'INSERT INTO departments (name) VALUES ($1)',
                [response.deptName],
                (err: Error, _result: QueryResult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`Department added`);
                        menu();
                    }
                })
        })
};

// Function call to initialize app
menu();
