DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
use employees_DB;
CREATE TABLE DEPARTMENT (
id int not null auto_increment,
dept_name varchar(30) not null,
utilized_budget decimal,
primary key (id)
);

CREATE TABLE ROLE (
id int not null auto_increment,
title varchar(30),
salary decimal,
department_id int,
foreign key(department_id)references department (id),
primary key (id)
);

CREATE TABLE EMPLOYEE (
id int not null auto_increment,
first_name varchar(30)not null,
last_name varchar(30)not null,
employee_dept varchar(30)not null,
salary decimal not null,
role_id int not null,
manager_id int,
foreign key(manager_id)references employee (id),
foreign key(role_id)references roles (id),
primary key (id)
);

CREATE TABLE MANAGER (
id int not null,
manager_name varchar(30) not null
);
