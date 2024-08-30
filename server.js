const inquirer = require('inquirer');
const db = require ('./connection');

const app = express();
const PORT = process.env.PORT || 5432;

console.log(db);

function viewEmployees() {
  const query = 'SELEST * FROM employee;';
  db.query(query, (err, {rows}) =>{
    if (err) { 
      res.status(500).json({error: err.message});
      return;
    }
    console.table(rows)
  })
}

function addEmployee() { //Inquirer function to add a new employee
  inquirer.prompt([
    {
      type: 'input',
      messgae: 'Enter First name.',
      name: 'firstName'
    },
    {
      type: 'input',
      messgae: 'Enter Last name.',
      name: 'lastName'
    },
    {
      type: 'list',
      messgae: 'What is the employees role?',
      choices:['Opener', 'Closer', 'Sales Manager','Payroll Manager', 'Account Manager','Quality Assurance'],
      name: 'role'
    },
    {
      type: 'confirm',
      messgae: 'Add another Employee?',
      name: 'newEmployee'
    },
  ])
}

function viewDepartments() {
  const sql = "SELECT * FROM department;";

  db.query(sql, (err, { rows }) => {

    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows)

  });
}

function addDepartment() {
  inquirer.prompt([
    {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'addDepartment'
    },
  ])
  .then((data) => {
    console.log(data); 
  })
}

function viewRoles() {
  const query = 'SELECT * FROM role;';
  db.query(query, (err, { rows }) => {

    if (err) {
        res.status(500).json({ error: err.message });
        return;
    }
    console.table(rows)
  });
}

function addRole() {
  inquirer.prompt([
    {
        type: 'input',
        message: 'what is the name of the role?',
        name: 'role'
    },
    {
        type: 'input',
        message: 'Enter the roles salary.',
        name: 'salary'
    },
    {
        type: 'list',
        message: 'What department does the role belong to?',
        choices: ['Opener', 'Closer', 'Sales Manager','Payroll Manager', 'Account Manager','Quality Assurance'],
        name: 'departmentName'
    },
    {
        type: 'confirm',
        message: 'Add new role?',
        name: 'newRole'
    },
  ])

  .then((answers) => {
      console.log(answers);
  })

}

function updateEmployee() {
  const query = 'SELECT first_name FROM employee;';
  db.query(query, (err, { rows }) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      console.table(rows)
  });
}

function init() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View Employees', 'Add employee',  'View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'Update Employee Role'],
      name: 'choices',
    },
  ])
  .then((answers) => {
    console.log(answers.choices);
    const userResponse = answers.choices;

    switch (userResponse) {
      case 'View Employees':
        viewEmployees();
        break;
      case 'Add employee':
        addEmployee();
        break;
      case 'View All Departments':
        viewDepartments(); 
        break;
      case 'Add Department':
        addDepartment(); 
        break;
      case 'View All Roles':
        viewRoles(); 
        break;
      case 'Add Role':
        addRole(); 
        break;
      case 'Update Employee Role':
        updateEmployee(); 
        break;
    }

  })
};

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  init();
  
});

