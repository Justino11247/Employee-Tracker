# Employee Tracker

Employee Tracker is a command-line application that is built with Node.js, Inquirer, and PostgreSQL. It is designed to help manage a companies database of employees. Below are some examples of what options this application offers:

- View all departments
- View all roleseach role.
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee's role

## Installation

To install Employee Tracker:

- Clone the repository: https://github.com/Justino11247/Employee-Tracker

- Go to the project directory

- Launch the terminal and execute `npm install`

- Set up the PostgreSQL database:

  - Input `psql -U postgres` to open PostgreSQL command line interface, input password if needed.
  - Set up database by inserting schema.sql and seeds.sql files using `\i schema.sql`
  - Then input `\i seeds.sql` 
  -After this, your database should be correctly set up.

- User will need to Remove '.EXAMPLE' from the '.env.EXAMPLE'

- User will then fill out that '.env' file with their own credentials.

## Usage

- Run the following command in your terminal to start the application: `node server.js`

- Adhere to the application's guided prompts to navigate through the menu choices.

[Link to Walk Through Video]

![Screenshot of HRTracker]

