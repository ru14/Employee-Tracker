const mysql = require("mysql");
const inquirer = require("inquirer");
const asql = require("./Employee");
require("console.table");
let role;

const dbconfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_DB'
};

let db = mysql.createConnection(dbconfig);
let adb = asql.makeDb(dbconfig);

db.connect((err) => {
    if (err) {
        throw err;
    }

    console.log(`connected at: ${db.threadId}`);
    runSearch()
});

function addEmployees() {
    db.query('SELECT title,id, salary, department_id FROM ROLES', function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter first name of employee:"
            }, {

                type: "input",
                name: "Last_name",
                message: "Enter last name of employee:"
            }, {
                type: "list",
                message: "Add employee role:",
                name: "role",
                choices() {
                    const choiceArray = [];
                    response.forEach(({ title }) => {
                        choiceArray.push(title);
                    });
                    //console.log({choiceArray});

                    return choiceArray;
                }
            },
        ])

            .then((answer) => {

                let chosenItem;
                response.forEach((item) => {
                    if (item.title === answer.role) {
                        chosenItem = item;
                    }
                });

                //console.log("Choice: " + answer);
                // console.log("Role: " + answer.role);
                //response.forEach(item => {
                //    console.log("Item: " + item.title + " " + item.id);
                //})

                //console.log("ChosenItem: " + chosenItem.title + " " + chosenItem.id);

                const query = `INSERT INTO EMPLOYEE (first_name,Last_name,roles_id) VALUE(?,?,?) `

                db.query(

                    query, [answer.first_name, answer.Last_name, chosenItem.id], function (err, res) {
                        if (err) throw err;
                        console.table(`${answer.first_name, answer.last_name}added`, res);
                        runSearch()
                    })

            })
    })
    //console.log({query})c

}

function addNewRole() {
    db.query('SELECT dept_name,id FROM DEPARTMENT', function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
        inquirer.prompt([
            {
                type: "input",
                message: "Enter title of new role:",
                name: "title"
            }, {
                type: "input",
                message: "Enter salary of new role:",
                name: "salary"
            }, {
                type: "list",
                message: "Assign new role to an present department:",
                name: "department",
                choices() {
                    const choiceArray = [];
                    response.forEach(({ dept_name }) => {
                        choiceArray.push(dept_name);
                    });
                    //console.log({choiceArray});

                    return choiceArray;
                }
            },
        ])

            .then((answer) => {

                let chosenItem;
                response.forEach((item) => {
                    if (item.dept_name === answer.department) {
                        chosenItem = item;
                    }
                });
                const query = `INSERT INTO ROLES  (title,salary,department_id) VALUE(?,?,?) `

                db.query(

                    query, [answer.first_name, answer.Last_name, chosenItem.id], function (err, res) {
                        if (err) throw err;
                        console.table(`${answer.title, answer.roles}added`, res);
                        runSearch()
                    })

            })
    })
    //console.log({query})c

}

function addNewDepartment() {
    db.query('SELECT title,id, salary, department_id FROM ROLES', function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
        inquirer.prompt([
            {
                type: "input",
                message: "Enter new department name:",
                name: "dept_name "
            }, {
                type: "list",
                message: "Assign new department to an present roles:",
                name: "role",
                choices() {
                    const choiceArray = [];
                    response.forEach(({ title }) => {
                        choiceArray.push(title);
                    });
                    //console.log({choiceArray});

                    return choiceArray;
                }
            },
        ])

            .then((answer) => {

                let chosenItem;
                response.forEach((item) => {
                    if (item.title === answer.role) {
                        chosenItem = item;
                    }
                });
                const query = `INSERT INTO DEPARTMENT  (dept_name) VALUE(?) `

                db.query(

                    query, [answer.dept_name, chosenItem.id], function (err, res) {
                        if (err) throw err;
                        console.table(`${answer.title, answer.roles}added`, res);
                        runSearch()
                    })

            })
    })
    //console.log({query})c

}

function runSearch() {
    inquirer.prompt([
        {
            name: "VeiwEmployee",
            type: "list",
            message: "Which devision you want to see?",
            choices: [
                        "Veiw all departments.",
                        "View all employees.",
                        "Veiw all employees by roles.",
                        "Veiw all employees by manager.",
                        "Add employee.",
                        "Add New role.",
                        "Add New Department.",
                        "Update employee role.",
                        "Upadte employee manager.",
                        "Remove.",
                        "View total budget of Department.", "End session."]
        }])
        .then(function (answer) {
            switch (answer.VeiwEmployee) {
                case "Veiw all departments.":
                    viewDepartments();
                    break;

                case "View all employees.":
                    veiwAllEmployees();
                    break;

                case "Veiw all employees by roles.":
                    viewEmployeeByRoles();
                    break;

                case "Veiw all employees by manager.":
                    viewEmployeeByManager();
                    break;
                case "Add employee.":
                    addEmployees();
                    break;
                case "Add New role.":
                    addNewRole();
                    break;
                case "Add New Department.":
                    addNewDepartment();
                    break;
                case "Remove.":
                    Remove();
                    break;
                case "Update employee role.":
                    updateEmployeeRole();
                    break;
                case "Upadte employee manager.":
                    UpadateEmployeesManager();
                    break;
                case "View total budget of Department.":
                    VeiwTotalBudget();
                    break;
                case "End session.":
                   db.end();
                   //adb.end();
                    break;

                default:
                    console.log("No method mateches with selection.");
                    break;                    
            }


        });
}

function viewDepartments() {
    let query = " SELECT department.dept_name AS Department,employee.id, employee.first_name, employee.last_name ";
    query += " FROM EMPLOYEE ";
    query += " LEFT JOIN roles ON employee.roles_id = roles.id "
    query += " LEFT JOIN department ON roles.department_id = department.id ";
    query += " ORDER BY department.dept_name ";
    //console.log({query})
    db.query(query, function (err, res) {
        if (err) throw err;
        //console.log({res})
        console.table('Employees By Department', res);
        runSearch()
    })
}

function veiwAllEmployees() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS Department, roles.salary,CONCAT(manager.first_name," " ,manager.last_name) AS manager
    FROM EMPLOYEE
    LEFT JOIN roles ON employee.roles_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`;

    //console.log({query})

    db.query(query, function (err, res) {
        if (err) throw err;
        //console.log({res})
        console.table('All Employees', res);
        runSearch()

    })
}

function viewEmployeeByRoles() {
    let query = " SELECT roles.title ,roles.salary, employee.id, employee.first_name, employee.last_name ";
    query += " FROM EMPLOYEE ";
    query += " LEFT JOIN roles ON employee.roles_id = roles.id "
    query += " LEFT JOIN department ON roles.department_id = department.id ";
    query += " ORDER BY roles.title ";
    //console.log({query})
    db.query(query, function (err, res) {
        if (err) throw err;
        //console.log({res})
        console.table('Employees By Department', res);
        runSearch()
    })
}

function viewEmployeeByManager() {
    let query = `SELECT CONCAT(m.first_name, ' ', m.last_name) AS Manager, e.id AS EmployeeID, CONCAT(e.first_name, ' ', e.last_name) AS EmployeeName,	roles.title AS Role, roles.salary AS Salary,
department.dept_name AS Department    
FROM employee e
INNER JOIN employee m ON 
	e.manager_id = m.id
LEFT JOIN roles ON e.roles_id = roles.id 
LEFT JOIN department ON roles.department_id = department.id
ORDER BY Manager`;

    //console.log({query})

    db.query(query, function (err, res) {
        if (err) throw err;
        //console.log({res})
        console.table('All Employees', res);
        runSearch()

    })
}

async function updateEmployeeRole() {
    const queryResult1 = await adb.query('SELECT first_name,last_name, employee.id FROM EMPLOYEE');
    let employeeList = [];
    queryResult1.forEach(({ first_name, last_name, id }) => {
        employeeList.push({
            name: first_name + " " + last_name,
            value: {
                first_name,
                last_name,
                id
            }
        })
    });

    const queryResult2 = await adb.query('SELECT title, id, salary, department_id FROM ROLES');
    let roleList = [];
    queryResult2.forEach(({ title, id, salary, department_id }) => {
        roleList.push({
            name: title,
            value: {
                title,
                id,
                salary,
                department_id
            }
        })
    });

    console.log({ employeeList });
    console.log({ roleList });
    let answer = await inquirer.prompt([
        {
            type: "list",
            message: "Which employee you want updated?",
            name: "employee",
            choices: employeeList
        }, {
            type: "list",
            message: "Which role you want to assign to this employee?",
            name: "role",
            choices: roleList
        }
    ]);

    //console.log({answer});
    //console.log(`Chosen employee: ${answer.employee.id} ${answer.employee.first_name} ${answer.employee.last_name}`);
    //console.log(`Chosen role: ${answer.role.id} ${answer.role.title} ${answer.role.salary}`);

    const updateQueryString = `UPDATE EMPLOYEE SET roles_id = ${answer.role.id} WHERE id = ${answer.employee.id}`;
    //console.log(`Delete query: ${updateQueryString}`);
    const queryResult3 = await adb.query(updateQueryString);
    //console.table(`Employee table has been updated`);
    runSearch();
}

function Remove() {
    inquirer.prompt([
        {
            type: "list",
            message: "What do you want to remove:",
            name: "remove",
            choices: ["Remove departments", "Remove employees", "Remove roles"]
        },
    ])
        .then((answer) => {
            switch (answer.remove) {
                case "Remove departments":
                    removeDepartment();
                    break;

                case "Remove employees":
                    removeEmployees();
                    break;

                case "Remove roles":
                    removeRoles();
                    break;

                default:
                    console.log("Response did not match any option.");
            }
        })

};

async function removeDepartment() {
    const queryResult1 = await adb.query('SELECT dept_name, department.id FROM DEPARTMENT');
    let departmentList = [];
    queryResult1.forEach(({ id, dept_name }) => {
        departmentList.push({
            name:  `${id} ${dept_name}`,            
            value: {
                dept_name,
                id
            }
        })
    });

    console.log({ departmentList });
    let answer = await inquirer.prompt([
        {
            type: "list",
            message: "Which Department you want remove?",
            name: "department",
            choices: departmentList
        }
    ]);

    const removeQueryString = `DELETE FROM DEPARTMENT WHERE id = ${answer.department.id}`;
    console.log("Remove query: " + removeQueryString);
    const queryResult3 = await adb.query(removeQueryString);
    runSearch();
}

async function removeEmployees() {
    const queryResult1 = await adb.query('SELECT employee.first_name ,employee.last_name, employee.id, employee.roles_id, employee.manager_id FROM EMPLOYEE');
    let employeeList = [];
    queryResult1.forEach(({ first_name, last_name, id }) => {
        employeeList.push({
            name: first_name + " " + last_name,
            value: {
                first_name,
                last_name,
                id,
                roles_id,
                manager_id
            }
        })
    });
    console.log({ employeeList });
    let answer = await inquirer.prompt([
        {
            type: "list",
            message: "Which employee you want to remove?",
            name: "employee",
            choices: employeeList
        }
    ]);
    const removeQueryString = `DELETE FROM EMPLOYEE WHERE id = ${answer.employee.id}`;
    const queryResult3 = await adb.query(removeQueryString);
    runSearch();
}

async function removeRoles() {
    const queryResult1 = await adb.query('SELECT roles.title ,roles.salary, roles.id FROM ROLES');
    let rolesList = [];
    queryResult1.forEach(({ title, salary, id }) => {
        rolesList.push({
            name: title,
            value: {
                title,
                salary,
                id
            }
        })
    });
    console.log({ rolesList });
    let answer = await inquirer.prompt([
        {
            type: "list",
            message: "Which employee you want to remove?",
            name: "roles",
            choices: rolesList
        }
    ]);
    const removeQueryString = `DELETE FROM ROLES WHERE id = ${answer.roles_id}`;
    const queryResult3 = await adb.query(removeQueryString);
    runSearch();
}


async function UpadateEmployeesManager() {
    const queryResult1 = await adb.query('SELECT first_name,last_name, employee.id FROM EMPLOYEE');
    let employeeList = [];
    queryResult1.forEach(({ first_name, last_name, id }) => {
        employeeList.push({
            name: first_name + " " + last_name,
            value: {
                first_name,
                last_name,
                id
            }
        })
    });

    console.log({ employeeList });
    // console.log({ roleList });
    let answer = await inquirer.prompt([
        {
            type: "list",
            message: "Which employee you want updated?",
            name: "employee",
            choices: employeeList
        }, {
            type: "list",
            message: "Which manager you want to assign to this employee?",
            name: "manager",
            choices: employeeList
        }
    ]);

    console.log({answer});    
    if(answer.manager.id != answer.employee.id) {
        const updateQueryString = `UPDATE EMPLOYEE SET manager_id = ${answer.manager.id} WHERE id = ${answer.employee.id}`;
        console.log(`Update query: ${updateQueryString}`);
        const queryResult3 = await adb.query(updateQueryString);        
    } else {
        console.log("Employee can't be his/her own manager.");
    }

    runSearch();
}

function VeiwTotalBudget() {
    let query = `SELECT SUM(salary) TotalBudget FROM ROLES;`;
    db.query(query, function (err, res) {
        if (err) throw err;
        //console.log({res})
        console.table('All Employees', res);
        runSearch()

    })
}

function endSession(){

}