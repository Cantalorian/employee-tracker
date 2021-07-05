USE employees_db;

INSERT INTO department (id, name)
VALUES (1, "Sales");

INSERT INTO department (id, name)
VALUES (2, "Engineering");

INSERT INTO department (id, name)
VALUES (3, "Finance");

INSERT INTO department (id, name)
VALUES (4, "Legal");



INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Salesperson", 80000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Lead Engineer", 150000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Software Engineer", 125000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Accountant", 120000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Lawyer", 190000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Legal Team Lead", 250000, 4);



INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Malia", "Brown", 5, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Tom", "Allen", 6, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Ashley", "Rodriguez", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Kevin", "Tupik", 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Mike", "Chan", 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Sara", "Lourd", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Christian", "Eckenrode", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Tammer", "Galal", 4, 2);