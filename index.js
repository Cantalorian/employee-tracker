const mysql = require('mysql2');
const inquire = require('inquirer');
const table = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3001,
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Superstrongpassword3!',
    database: 'employees_db'
  },
  console.log('Connected to the employee database.')
);

// connect to the mysql server and sql database
db.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  firstPrompt();
});