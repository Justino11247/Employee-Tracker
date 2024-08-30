const inquirer = require('inquirer');
const db = require ('./connection');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5432;

console.log(db);

function viewEmployees() {
  const query = `
    SELECT 
      e.id, 
      e.first_name, 
      e.last_name, 
      r.title AS role, 
      d.name AS department,
      r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM 
      employee e
    LEFT JOIN 
      role r ON e.role_id = r.id
    LEFT JOIN 
      department d ON r.department_id = d.id
    LEFT JOIN
      employee m ON e.manager_id = m.id
    ORDER BY
      e.id
  `;

  db.query(query)
    .then(result => {
      console.table(result.rows);
    })
    .catch(err => {
      console.error('Error viewing employees:', err);
    })
    .finally(() => {
      return init();
    });
}

function addEmployee() {
  let roles, employees;
  
  // Fetch all roles
  db.query('SELECT id, title FROM role')
    .then(result => {
      roles = result.rows;
      // Fetch all employees for potential managers
      return db.query('SELECT id, first_name, last_name FROM employee');
    })
    .then(result => {
      employees = result.rows;
      
      const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
      }));

      const managerChoices = employees.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
      }));
      managerChoices.unshift({ name: 'None', value: null });

      return inquirer.prompt([
        {
          type: 'input',
          message: 'Enter First name.',
          name: 'firstName'
        },
        {
          type: 'input',
          message: 'Enter Last name.',
          name: 'lastName'
        },
        {
          type: 'list',
          message: 'What is the employee\'s role?',
          choices: roleChoices,
          name: 'roleId'
        },
        {
          type: 'list',
          message: 'Who is the employee\'s manager?',
          choices: managerChoices,
          name: 'managerId'
        }
      ]);
    })
    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
      return db.query(query, [firstName, lastName, roleId, managerId]);
    })
    .then(() => {
      console.log('Employee added successfully!');
      return init();
    })
    .catch(err => {
      console.error('Error adding employee:', err);
      return init();
    });
}

async function viewDepartments() {
  const query = "SELECT * FROM department;";
  await new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error viewing departments:', err);
        reject(err);
      } else {
        console.table(result.rows);
      }
      resolve();
    });
  });
  return init();
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
  const query = `
    SELECT 
      r.id,
      r.title,
      r.salary,
      d.name AS department_name
    FROM 
      role r
    LEFT JOIN 
      department d ON r.department_id = d.id
    ORDER BY
      r.id
  `;

  db.query(query)
    .then(result => {
      console.table(result.rows);
    })
    .catch(err => {
      console.error('Error viewing roles:', err);
    })
    .finally(() => {
      return init();
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

function updateEmployeeRole() {
  let employees, roles;

  // First, fetch all employees
  db.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee')
    .then(employeeResult => {
      employees = employeeResult.rows;
      // Then, fetch all roles
      return db.query('SELECT id, title FROM role');
    })
    .then(roleResult => {
      roles = roleResult.rows;

      // Prepare choices for inquirer
      const employeeChoices = employees.map(emp => ({
        name: emp.name,
        value: emp.id
      }));

      const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
      }));

      // Prompt user to select an employee and a new role
      return inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which employee\'s role do you want to update?',
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Which role do you want to assign the selected employee?',
          choices: roleChoices
        }
      ]);
    })
    .then(answers => {
      const { employeeId, roleId } = answers;

      // Update the employee's role in the database
      const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
      return db.query(query, [roleId, employeeId]);
    })
    .then(() => {
      console.log('Employee role updated successfully!');
    })
    .catch(err => {
      console.error('Error updating employee role:', err);
    })
    .finally(() => {
      return init(); // Return to the main menu
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
        return viewEmployees();
      case 'Add employee':
        return addEmployee();
      case 'View All Departments':
        return viewDepartments(); 
      case 'Add Department':
        return addDepartment(); 
      case 'View All Roles':
        return viewRoles(); 
      case 'Add Role':
        return addRole(); 
      case 'Update Employee Role':
        return updateEmployeeRole(); 
      case 'Exit':
        console.log('Goobye!');
        process.exit(0);
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

