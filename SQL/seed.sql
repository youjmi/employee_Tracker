/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employee_trackerDB;

INSERT INTO department (name)
VALUES 
 ("Front Office"),
 ("Housekeeping"), 
 ("Engingeering"),
 ("Food & Beverage"),
 ("Sales"),
 ("Executive Office");

INSERT INTO role (title, salary, department_id)
VALUES 
("Front Desk Agent", 55000, 1),
("Concierge", 40000, 1),
("Bellman", 40000, 1),
("Doorman", 40000, 1),
("Front Office Manager", 60000,1),
("Director of Rooms", 70000,1),
("Room Attendants",40000, 2),
("Houseman",40000, 2),
("Director of Housekeeping", 70000, 2),
("Engineer", 60000, 3),
("Director of Engineering", 80000, 3),
("Server",40000, 4),
("Chef",55000,4),
("Director of Food & Beverage",70000,4),
("Sales Agent", 45000, 5),
("Director of Sales",80000, 5),
("Executive Assistant",80000,6),
("General Manager", 200000, 6);


INSERT INTO employee (first_name,last_name, role_id,manager_id)
VALUES 
("Young Ji","Kim", 1, 3 ),
("Amir", "Ashtiany",4, 1),
("Rachel", "Wanke",2, NULL),
("Johnnie", "Simpson",3, 2),
("Frankie", "Rosado",5, NULL),
("Gabe", "Perry",6, 1),
("Lawrence", "Kirk",1,NULL),
("Nathan", "Keyes",3, 2),
("Saveliy", "Samolyev",2, NULL),
("John", "Toth",4,3),
("Jenner", "Garcia",6,3)
;

