import {Pool} from './connection.js';
import inquirer from 'inquirer';

export async function viewAllDepartments(next: any) { 
  const query = 'SELECT * FROM department';
  const response = await Pool.query(sql);
  console.table(response.rows);
  await next(); 
}
export async function addDepartment(next: any) { 
  const { department_name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: 'Enter the name of the new department:',
    },
  ]);
  const sql = 'INSERT INTO department (name) VALUES ($1)';
  const params = [department_name];
  await Pool.query(sql, params);
  await viewAllDepartments(next);
}