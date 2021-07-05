const mysql = require("mysql2");
const inquirer = require("inquirer");
const table = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Superstrongpassword3!",
    database: "employees_db",
  },
  console.log(`Now connected to the employee database!`),
  firstPrompt()
);

function firstPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View all employees",
          "View all roles",
          "View all departments",
          "Update an employee",
          "Add an employee",
          "Add a role",
          "Add a department",
        ],
      },
    ])
    .then(function (data) {
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
      }
    });
}

// View all employees in DB
function viewAllEmployees() {
  console.log(`===VIEWING EMPLOYEES===`);

  let query =
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;";

  db.query(query, function (err, employees) {
    if (err) {
      console.log(err);
    }

    console.table(employees);

    firstPrompt();
  });
}

// View all roles
function viewAllRoles() {
  console.log(`===VIEWING BY ROLES===`);

  let query = "SELECT * FROM role";

  db.query(query, function (err, roles) {
    if (err) {
      console.log(err);
    }

    console.table(roles);

    firstPrompt();
  });
}

// View all employees by department
function viewAllDepartments() {
  console.log(`===VIEWING BY DEPARTMENT===`);

  let query = "SELECT * FROM department;";

  db.query(query, function (err, departments) {
    if (err) {
      console.log(err);
    }

    console.table(departments);

    firstPrompt();
  });
}

// Adds a new employee
async function addEmployee() {
  db.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "roleName",
          type: "list",
          message: "What is the employee's role?",
          choices: function () {
            rolesArray = [];
            result.forEach((result) => {
              rolesArray.push(result.title);
            });
            return rolesArray;
          },
        },
      ])
      .then(function (answer) {
        console.log(answer);

        const role = answer.roleName;

        db.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          let filteredRole = res.filter(function (res) {
            return res.title == role;
          });

          let roleId = filteredRole[0].id;

          db.query("SELECT * FROM employee", function (err, res) {
            inquirer
              .prompt([
                {
                  name: "manager",
                  type: "list",
                  message: "Who is your manager?",
                  choices: function () {
                    managersArray = [];
                    res.forEach((res) => {
                      managersArray.push(res.last_name);
                    });
                    return managersArray;
                  },
                },
              ])
              .then(function (managerAnswer) {
                const manager = managerAnswer.manager;

                db.query("SELECT * FROM employee", function (err, res) {
                  if (err) throw err;

                  let filteredManager = res.filter(function (res) {
                    return res.last_name == manager;
                  });

                  let managerId = filteredManager[0].id;
                  console.log(managerAnswer);

                  let query =
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

                  let values = [
                    answer.firstName,
                    answer.lastName,
                    roleId,
                    managerId,
                  ];

                  console.log(values);

                  db.query(query, values, function (err, res, fields) {
                    console.log(
                      `You have added this employee: ${values[0].toUpperCase()}.`
                    );
                  });
                  viewAllEmployees();
                });
              });
          });
        });
      });
  });
}

// Add new role
function addRole() {
  console.log(`===ADD A NEW ROLE===`);

  let query = "SELECT role.title AS Title, role.salary AS Salary FROM role";

  db.query(query, function (err, data) {
    inquirer
      .prompt([
        {
          name: "Department",
          type: "list",
          message: "Please select the appropriate department for this role",
          choices: ["Sales", "Engineering", "Finance", "Legal"],
        },
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?",
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?",
        },
      ])
      .then(function (data) {
        if (data.Department === "Sales") {
          data.Department = 1;
        } else if (data.Department === "Engineering") {
          data.Department = 2;
        } else if (data.Department === "Finance") {
          data.Department = 3;
        } else {
          data.Department = 4;
        }
        db.query(
          "INSERT INTO role SET ?",
          {
            title: data.Title,
            salary: data.Salary,
            department_id: data.Department,
          },
          function (err) {
            if (err) {
              throw err;
            }
            console.table(data);
            firstPrompt();
          }
        );
      });
  });
}

// Add new department
function addDepartment() {
  console.log(`===ADD A NEW DEPARTMENT===`);

  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (data) {
      let query = "INSERT INTO department SET ? ";

      db.query(
        query,
        {
          name: data.name,
        },
        function (err) {
          if (err) {
            console.log(err);
          }
          console.table(data);

          firstPrompt();
        }
      );
    });
}

// Choose role for new Employee
const roleArray = [];

function selectRole() {
  let query = "SELECT * FROM role";

  db.query(query, function (err, role) {
    if (err) {
      console.log(err);
    }
    for (i = 0; i < role.length; i++) {
      roleArray.push(role[i].title);
    }
  });
  return roleArray;
}

// Update existing employee
function updateEmployee() {
  console.log(`===UPDATE AN EMPLOYEE===`);

  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;";

  db.query(query, function (err, employee) {
    if (err) {
      throw err;
    }

    const ids = employee.map((employee) => employee.id);

    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "What is the Employee's ID? ",
          choices: ids,
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the Employees new title? ",
          choices: selectRole(),
        },
      ])
      .then(function (employee) {
        let roleId = selectRole().indexOf(employee.role) + 1;

        db.query(
          "UPDATE employee SET employee.role_id = ? WHERE employee.id = ?",
          [roleId, employee.id],
          (err, employee) => {
            console.table(employee);

            firstPrompt();
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
};