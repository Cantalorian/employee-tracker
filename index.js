const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Superstrongpassword3!',
    database: 'employees_db'
  },
  console.log(`Now connected to the employee database!`),
  firstPrompt()
);

function firstPrompt() {
  inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View all employees", 
              "View all roles",
              "View all departments",
              "View employees by manager",
              "Update an employee",
              "Add an employee",
              "Add a role",
              "Add a department"
            ]
    }
  ]).then(function(data) {
    switch (data.choice) {
      case "View all employees":
            viewAllEmployees();
            break;
            
      case "View all roles":
            viewAllRoles();
            break;

      case "View all departments":
            viewAllDepartments();
            break;
          
      case "Add an employee":
            addEmployee();
            break;
          
      case "Update an employee":
            updateEmployee();
            break;
              
      case "Add a role":
            addRole();
            break;
            
      case "Add a department":
            addDepartment();
            break;
            
      case "View employees by manager":
            viewByManager();
            break;              
    }
  })
};

// View all employees in DB
function viewAllEmployees() {
  console.log(`===VIEWING EMPLOYEES===`);

  let query = 
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;";
  
  db.query(query, function (err, employees) {
    if (err) {
      console.log(err);
    }
  
    console.table(employees)
  
    firstPrompt()
  });
};
