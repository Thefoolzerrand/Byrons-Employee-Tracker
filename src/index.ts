import {connectToDb} from './connection.js';
import inquirer from 'inquirer';
import { viewAllDepartments, addDepartment } from './department.js';
import { viewAllRoles, addRole } from './role.js';
import { viewAllEmployees, addEmployee, updateEmployeeRole } from './employee.js';

await connectToDb();

async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (answers.action) {
        case 'View all departments':
            await viewAllDepartments(main);
            break;
        case 'View all roles':
            await viewAllRoles(main);
            break;
        case 'View all employees':
            await viewAllEmployees(main);
            break;
        case 'Add a department':
            await addDepartment(main);
            break;
        case 'Add a role':
            await addRole(main);
            break;
        case 'Add an employee':
            await addEmployee(main);
            break;
        case 'Update an employee role':
            await updateEmployeeRole(main);
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }
}
    main();
