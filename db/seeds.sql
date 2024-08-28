INSERT INTO department(name)
VALUES  ('Human Resources'), 
        ('Customer Service'), 
        ('Sales'), 
        ('Collections'), 
        ('Legal');


INSERT INTO role(title, salary, department_id)
VALUES  ('Opener', 50000, 3), 
        ('Closer', 100000, 3), 
        ('Sales Manager', 150000, 3)
        ('Payroll Manager', 80000, 1), 
        ('Account Manager', 90000, 4), 
        ('Quality Assurance', 60000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Jon', 'Smith', 3, NULL),
        ('Brenda', 'Song', 5, NULL),
        ('Jane', 'Doe', 1, 1),
        ('Fankie', 'Welp', 2, 1),
        ('Rosie', 'Pham', 4, NULL),
        ('Michael', 'Ghammssari', 6, 2);
