insert into departments (name) values
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('HR');

insert into roles (title, salary, department) values
('HR manager', 60000, 5),
('HR assistant', 40000, 5),
('Sales manager', 80000, 1),
('Sales associate', 50000, 1),
('Engineer', 90000, 2),
('Legal counsel', 120000, 4),
('Finance manager', 95000, 3),
('Finance assistant', 45000, 3);

insert into employees (first_name, last_name, role_id, manager_id) values
('John', 'Doe', 1, null),
('Jane', 'Smith', 2, 1),
('Jim', 'Brown', 3, 1),
('Jake', 'White', 4, 3),
('Jill', 'Green', 5, 3),
('Jack', 'Black', 6, 5),
('Jenny', 'Blue', 7, 5),
('Jordan', 'Red', 8, 7);