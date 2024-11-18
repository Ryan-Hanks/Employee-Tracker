DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
);

INSERT INTO department (name)
VALUES  ('Marketing'),
        ('E-Commerce'),
        ('Security'),
        ('Quality Control'),
        ('IT'),
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('Lead Designer', 100000, 1),
        ('Graphic Designer', 60000, 1),
        ('Photographer', 45000, 1),
        ('Web Designer', 75000, 2),
        ('Security Guard', 35000, 3),
        ('Test Engineer', 50000, 4),
        ('Software Developer', 120000, 5),
        ('Sales Lead', 90000, 6),
        ('Sales Representative', 45000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Rick', 'Novak', 1),
        ('Susan', 'Connor', 2),
        ('Margaret', 'Adelman', 3),
        ('Ronald', 'Barr', 4),
        ('Marie', 'Broadbet', 5),
        ('Roger', 'Lum', 6),
        ('Marlene', 'Donahue', 7),
        ('Jeff', 'Johnson', 8),
        ('Melvin', 'Forbis', 9),