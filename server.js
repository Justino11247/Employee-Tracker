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

