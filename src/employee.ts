import {Pool} from "./connection.js";
import inquirer from "inquirer";

export async function viewAllEmployees(next: any) { 
    const sql = "SELECT * from employee";
    const response = await Pool.query(sql);
    console.table(response.rows);
    await next();
}
export async function addEmployee(next: any) { 
    const role_sql = "select titale as name, id as value from role";
    const role_response = await Pool.query(role_sql);
    const roles = role_response.rows;
    
    const manager_sql = "select id as value, CONCAT(first_name, ' ', last_name) as name from employee where manager_id is null";
    const manager_response = await Pool.query(manager_sql);
    const managers = manager_response.rows;
    managers.push({name: "None", value: null});
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt
 ([
        {
            type: "input",
            name: "first_name",
            message: "Enter the first name of the new employee:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the last name of the new employee:",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the role for the new employee:",
            choices: roles,
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter the manager for the new employee:",
            choices : managers, 
        },
    ]);
    const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
    const params = [first_name, last_name, role_id, manager_id || null];
    await Pool.query(sql, params);
    await viewAllEmployees(next);
}
export async function updateEmployeeRole(next: any) {
    const role_sql = "select title as name, id as value from role";
    const role_response = await Pool.query(role_sql);
    const roles = role_response.rows;

    const employee_sql = "select id as value, CONCAT(first_name, ' ', last_name) as name from employee";
    const employee_response = await Pool.query(employee_sql);
    const employees = employee_response.rows;
    const { employee_id, role_id } = await inquirer.prompt
    ([    
        {
            type: "input",
            name: "employee_id",
            message: "Enter the ID of the employee to update:",
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter the new role ID for the employee:",
        },
    ]);
    const sql = "UPDATE employee SET role_id = $1 WHERE id = $2";
    const params = [role_id, employee_id];
    await Pool.query(sql, params);
    await viewAllEmployees(next);
}
