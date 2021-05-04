const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
const employee = require("./Employee");
let role;


let db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_DB'
});

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

};

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

};

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

};

function runSearch() {
    inquirer.prompt([
        {
            name: "VeiwEmployee",
            type: "list",
            message: "Which devision you want to see?",
            choices: ["Veiw all departments.", "View all employees.", "Veiw all employees by roles.", "Veiw all employees by manager.", "Add employee.", "Add New role.", "Add New Department"]
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
                case "Add New department.":
                    addNewDepartment();
                    break;
                case "Remove employee.":
                    removeEmployees();
                    break;
                case "Update employee role.":
                    upadateEmployeeRole();
                    break;
                case "Upadte employee manager.":
                    upadateEmployeesManager();
                    break;
                case "End session.":
                    endSession();
                    break;

            }


        });
};

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
};

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
};

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
};

function viewEmployeeByManager() {
    let query = "SELECT CONCAT(manager.first_name,manager.last_name) AS manager FROM EMPLOYEE, roles.title, department.dept_name AS Department, roles.salary, employee.first_name, employee.last_name ";
    query += " FROM EMPLOYEE ";
    query += " LEFT JOIN manager ON manager.id = employee.manager_id ";
    query += " ORDER BY manager.first_name ";
    //console.log({query})
    db.query(query, function (err, res) {
        if (err) throw err;
        //console.log({res})
        console.table('Employees By Manager', res);
        runSearch()
    })
};



//module.exports = db;
// function upadateEmployeeRole(){
    // function addEmployees() {
    //     db.query('SELECT CONCAT(employee.first_name," " ,employee.last_name) AS name title,id, salary, department_id FROM ROLES', function (err, response) {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log(response);
    //         inquirer.prompt([
    //             {
    //                 type: "input",
    //                 name: "first_name",
    //                 message: "Enter first name of employee:"
    //             }, {
    
    //                 type: "input",
    //                 name: "Last_name",
    //                 message: "Enter last name of employee:"
    //             }, {
    //                 type: "list",
    //                 message: "Add employee role:",
    //                 name: "role",
    //                 choices() {
    //                     const choiceArray = [];
    //                     response.forEach(({ title }) => {
    //                         choiceArray.push(title);
    //                     });
    //                     //console.log({choiceArray});
    
    //                     return choiceArray;
    //                 }
    //             },
    //         ])
    
    //             .then((answer) => {
    
    //                 let chosenItem;
    //                 response.forEach((item) => {
    //                     if (item.title === answer.role) {
    //                         chosenItem = item;
    //                     }
    //                 });
    
    //                 //console.log("Choice: " + answer);
    //                 // console.log("Role: " + answer.role);
    //                 //response.forEach(item => {
    //                 //    console.log("Item: " + item.title + " " + item.id);
    //                 //})
    
    //                 //console.log("ChosenItem: " + chosenItem.title + " " + chosenItem.id);
    
    //                 const query = `INSERT INTO EMPLOYEE (first_name,Last_name,roles_id) VALUE(?,?,?) `
    
    //                 db.query(
    
    //                     query, [answer.first_name, answer.Last_name, chosenItem.id], function (err, res) {
    //                         if (err) throw err;
    //                         console.table(`${answer.first_name, answer.last_name}added`, res);
    //                         runSearch()
    //                     })
    
    //             })
    //     })
    //     //console.log({query})c
    
    // };
    // let query = " UPDATE EMPLOYEE ";
    // query += " SET  roles_id = "
// function endSession()