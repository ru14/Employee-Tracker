use employees_DB;

INSERT INTO DEPARTMENT (dept_name,utilized_budget )
VALUES ('Administration', 10000000),('Physican', 3000000),('Surgeon',4000000),('Nurse',75000),('Cafeteria & Catering', 50000),('Physical Therapy', 100000);

INSERT INTO ROLES (title,salary)
VALUES ('lead Surgeon', 3000000),('Assisting Surgeon', 3000000),('Nurse',75000);

INSERT INTO MANAGER (id,manager_name)
VALUES(1,'Anthony Soprano');


INSERT INTO EMPLOYEE (first_name,last_name ,employee_dept,salary,roles_id,manager_id)
VALUES('Anthony','Soprano','Administration',10000000,1,1),('Jennifer','Melfi','Surgeon',4000000,3,1),('Chistopher','Moltisanti','Surgeon',4000000,3,1),('Peter','Gualtieri','Physican', 3000000,2,1),('Pasty','Parisi','Nurse',75000,5,1),('Furoi','Giunta','Nurse',75000,8,1),('Anthony','Blundetto','Nurse',75000,6,1),('Vito','Spatafore','Cafeteria & Catering', 50000,9,1),('Ralph','Cifaretto','Physical Therapy', 100000,10,1),('Arthur','Bucco','Physical Therapy', 100000,11,1);

SELECT * FROM DEPARTMENT;
SELECT * FROM ROLES;
SELECT * FROM EMPLOYEE;