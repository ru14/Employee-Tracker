use employees_DB;

INSERT INTO DEPARTMENT (dept_name,utilized_budget )
VALUES ('Administration', 10000000),('Physican', 3000000),('Surgeon',4000000),('Nurse',75000),('Cafeteria & Catering', 50000),('Physical Therapy', 100000);

INSERT INTO ROLES (title,salary)
VALUES ('lead Surgeon', 3000000),('Assisting Surgeon', 3000000),('Nurse',75000);

INSERT INTO EMPLOYEE (first_name,last_name ,employee_dept,salary,roles_id)
VALUES('Anthony','Soprano','Administration',10000000,1),('Jennifer','Melfi','Surgeon',4000000,3),('Chistopher','Moltisanti','Surgeon',4000000,3),('Peter','Gualtieri','Physican', 3000000,2),('Pasty','Parisi','Nurse',75000,5),('Furoi','Giunta','Nurse',75000,8),('Anthony','Blundetto','Nurse',75000,6),('Vito','Spatafore','Cafeteria & Catering', 50000,9),('Ralph','Cifaretto','Physical Therapy', 100000,10),('Arthur','Bucco','Physical Therapy', 100000,11);

INSERT INTO MANAGER (id,manager_name)
VALUES(001,'Anthony Soprano');