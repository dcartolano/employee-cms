import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

import inquirer from 'inquirer';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// pool.query(
//   `DELETE FROM favorite_books WHERE id = $1`,
//   [deletedRow],
//   (err: Error, result: QueryResult) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`${result.rowCount} row(s) deleted!`);
//   }
// });

// // Query database
// pool.query('SELECT * FROM favorite_books', (err: Error, result: QueryResult) => {
//   if (err) {
//     console.log(err);
//   } else if (result) {
//     console.log(result.rows);
//   }
// });

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

const deptOptions = [
  'What is the name of the department?', // 0
];

const roleOptions = [
  'What is the name of the role?', // 0
  'What is the salary of the role?', // 1
  'Which department does the role belong to?', // 2
];

const emplOptions = [
  'What is the employee\'s first name?', // 0
  'What is the employee\'s last  name?', // 1
  'What is the employee\'s role?', // 2
];

const updateEmplRoleOptions = [
  'Which employee\'s role do you want to update?', // 0
  'Which role do you want to assign the selected employee?', // 1
  'Updated employee\'s role', // 2
];

function init() {
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
      if (response.do === mainOptions[0]) { // view all e
        pool.query(
          `SELECT
roles.title, departments.name, roles.salary FROM roles
JOIN departments ON roles.department_id = departments.id`,
          (err: Error, _result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Showing employees table`);
            }
          });
      }
      else if (response.do === mainOptions[1]) { // add e
        inquirer
          .prompt([
            // { // 0
            //     type: 'input',
            //     message: questions[0],
            //     name: 'title',
            // },
            {
              type: 'list',
              message: 'What would you like to do?',
              choices: mainOptions,
              name: 'do',
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
            // { // 0
            //     type: 'input',
            //     message: questions[0],
            //     name: 'title',
            // },
            {
              type: 'list',
              message: 'What would you like to do?',
              choices: mainOptions,
              name: 'do',
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
      else if (response.do === mainOptions[3]) { // view all r
        pool.query(
          `SELECT
roles.title, departments.name, roles.salary FROM roles
JOIN departments ON roles.department_id = departments.id`,
          (err: Error, _result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Showing roles table`);
            }
          });
      }
      else if (response.do === mainOptions[4]) { // add r
        inquirer
          .prompt([
            // { // 0
            //     type: 'input',
            //     message: questions[0],
            //     name: 'title',
            // },
            {
              type: 'list',
              message: 'What would you like to do?',
              choices: mainOptions,
              name: 'do',
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
        pool.query(
          `SELECT
roles.title, departments.name, roles.salary FROM roles
JOIN departments ON roles.department_id = departments.id`,
          (err: Error, _result: QueryResult) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Showing departments table`);
            }
          });
      }
      else if (response.do === mainOptions[6]) { // add d
        inquirer
          .prompt([
            // { // 0
            //     type: 'input',
            //     message: questions[0],
            //     name: 'title',
            // },
            {
              type: 'list',
              message: 'What would you like to do?',
              choices: mainOptions,
              name: 'do',
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

      }
    })
}

// Function call to initialize app
init();

// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
