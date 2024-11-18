const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
  {
    user: 'postgres',
    password: process.env.PASSWORD,
    host: 'localhost',
    database: 'company_db'
},
console.log('Connected to the company_db database!')
);

pool.connect();

const CompanyCMSPrompt = () => {
    inquirer
        .prompt([
            // Initial prompting
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'initialSelection',
                choices: [
                    'View departments',
                    'View roles',
                    'View employees',
                    'Add department',
                    'Add role',
                    'Add employee',
                    'Exit'
                ]
            }
        ]).then((answers) => {
            const choice = answers.initialSelection;

            switch (choice) {
                case 'View departments':
                    pool.query('SELECT * FROM department;', (err, data) => {
                                console.table(data.rows);
                                CompanyCMSPrompt();
                    });
                break;
                case 'View roles':
                    pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;', (err, data) => {
                        console.table(data.rows);
                        CompanyCMSPrompt();
                    });
                break;
                case 'View employees':
                    pool.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;', (err, data) => {
                        console.table(data.rows);
                        CompanyCMSPrompt();
                    });
                break;
                case 'Add department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter the name of department:',
                            name: 'department'
                        }
                    ]).then((answers) => {
                        console.log(answers.department);
                        pool.query(`INSERT INTO department (name) VALUES ('${answers.department}');`, () => {
                            CompanyCMSPrompt();
                        });
                    });
                break;

                case 'Add role':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter the title of the role:',
                            name: 'title'
                        },
                        {
                            type: 'number',
                            message: 'Enter the salary of the role:',
                            name: 'salary'
                        },
                        {
                            type: 'number',
                            message: 'Enter the department id of the role:',
                            name: 'dept_id'
                        }
                    ]).then((answers) => {
                        pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${answers.dept_id});`, () => {
                            CompanyCMSPrompt();
                        });
                    });
                break;
                case 'Add employee':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter employees first name:',
                            name: 'firstName'
                        },
                        {
                            type: 'input',
                            message: 'Enter employees last name:',
                            name: 'lastName'
                        },
                        {
                            type: 'number',
                            message: 'Enter the role id:',
                            name: 'roleId'
                        },
                    ]).then((answers) => {
                        pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.roleId})`, () => {
                            CompanyCMSPrompt();
                        });
                    });
                break;
                default: 
                    process.exit();
            };
        });
};

CompanyCMSPrompt();