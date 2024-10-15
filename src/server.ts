// import express from 'express'; // don't need server
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

import inquirer from 'inquirer';

await connectToDb();

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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

async function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: mainOptions,
        name: 'do',
      },
    ])
    .then(async(response) => {
      if (response.do === mainOptions[0]) { // view all e
        pool.query(
          `SELECT e1.first_name, e1.last_name, r.title, d.name AS department, r.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM roles AS r JOIN departments AS d ON r.department_id = d.id JOIN employees AS e1 ON r.id = e1.role_id LEFT OUTER JOIN employees AS e2 on e1.id = e2.manager_id ORDER BY r.id ASC`,
          (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.table(result.rows);
              init();
            }
          });
      }
      else if (response.do === mainOptions[1]) { // add e
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
              choices: mainOptions, // need to update
              name: 'employeeRole',
            },
          ])
          .then((response) => {
            pool.query(
              `${response}`,
              (err: Error, _result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Employee added`);
                }
              })
          });
    }
      else if (response.do === mainOptions[2]) { // update e r
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
            pool.query(
              `${response}`,
              (err: Error, _result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Updated employee\'s role`);
                }
              })
          });
      }
      else if (response.do === mainOptions[3]) { // view all r
        pool.query(
          `SELECT roles.title, departments.name AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id`,
          (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.table(result.rows);
              init();
            }
          });
      }
      else if (response.do === mainOptions[4]) { // add r
        inquirer
          .prompt([
            { // 0
                type: 'input',
                message: addRoleOptions[0], // r name
                name: 'roleName',
            },
            { // 1
                type: 'input',
                message: addRoleOptions[1], // r salary
                name: 'roleSalary',
            },
            { // 2
              type: 'list',
              message: addRoleOptions[2], // r dept
              choices: mainOptions, // need to update
              name: 'roleDept',
            },
          ])
          .then((response) => {
            pool.query(
              `${response}`,
              (err: Error, _result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Employee added`);
                }
              })
          });
      }
      else if (response.do === mainOptions[5]) { // view all d
        pool.query (
          `SELECT departments.name FROM departments`,
          (err: Error, result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.table(result.rows);
              init();
            }
          });
      }
      else if (response.do === mainOptions[6]) { // add d
        inquirer
          .prompt([
            { // 0
                type: 'input',
                message: addDeptOptions[0], // d name
                name: 'deptName',
            },
          ])
          .then((response) => {
            pool.query(
              `${response}`,
              (err: Error, _result: QueryResult) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Employee added`);
                }
              })
          });
      }
      else if (response.do === mainOptions[7]) { // q
        // this.exit = true; // doesn't work
        // return; // doesn't work
        process.exit(); // this one works
      }
    })
}

// Function call to initialize app
init();

// // Default response for any other request (Not Found)
// app.use((_req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
