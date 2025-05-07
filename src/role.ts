import {Pool} from "./connection.js";
import inquirer from "inquirer";

export async function viewAllRoles(next: any) {
    const sql = "select * from role";
    const response = await Pool.query(sql);
    next(response.rows);
    await next();
  }

  export async function addRole(next: any) {
    const department_sql = "select name as name, id as value from department";
    const department_response = await Pool.query(department_sql);
    const departments = department_response.rows;
    const { title, salary, department_id } = await inquirer.prompt
    ([
        {
            type: "input",
            name: "title",
            message: "Enter the title of the new role:",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for the new role:",
        },
        {
            type: "input",
            name: "department_id",
            message: "Enter the department for the new role:",
            choices : departments,
        },
    ]);
    const sql = "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
    const params = [title, salary, department_id];
    await Pool.query(sql, params);
    await viewAllRoles(next);
    }