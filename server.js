const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = ("console.table");

let db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_DB'
});

db.connect((err) =>{
    if (err) {
        throw err;
    }

    console.log(`connected at: ${db.threadId}`);
    runSearch()
});

function runSearch() {
    inquirer.prompt([
        {
            name: "VeiwEmployee",
            type: "list",
            message: "Which devision you want to see?",
            choices: ["Veiw all departments.", "View all employees.", "Veiw all employees by department.", "Veiw all employees by manager."]
        }])
        .then(function (answer) {
            switch (answer.VeiwEmployee) {
                case "Veiw all departments.":
                    viewDepartments();
                    break;

                case "View all employees.":
                    veiwAllEmployees();
                    break;

                case "Veiw all employees by department.":
                    viewEmployeeByDept();
                    break;

                case "Veiw all employees by manager.":
                    viewEmployeeByManager();
                    break;
                case "Add employees.":
                    addEmployees();
                    break;
                case "Remove employees.":
                    removeEmployees();
                    break;
                case "Update employee role.":
                    upadateEmployees();
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

function viewDepartments(){
    db.query("Select id, dept_name, utilized_budget FROM DEPARTMENT", function(err, results){
        if(err) throw err;
        console.table("DEPARTMENT", results);
        runSearch();
        db.end();
    });
};
function veiwAllEmployees(){
    let query = "Select employee.id, employee.first_name, employee.last_name, department.dept_name";
    query += "FROM employee";
    query += "INNER JOIN department ON employee.employee_dept = department.dept_name"
    query += "INNER JOIN role ON department.id = roles.department_id";
    query += "INNER JOIN manager ON employee.manager_id = manager.id";

    db.connection.query(query, function(err,results){
        console.table('All Employees', results);
        runSearch()
    })
};
function viewEmployeeByDept(){
    let query = "SELECT department.dept_name,employee.id, employee.first_name, employee.last_name";
    query += "FROM department";
    query += "INNER JOIN employee ON employee.employee_dept = department.dept_name";
    query += "ORDER BY department.dept_name";
    db.connection.query(query, function(err,results){
        console.table('Employees By Manager', results);
        runSearch()
    })
};
// function viewEmployeeByManager()
// function addEmployees()
// function removeEmployees()
// function upadateEmployees()
// function upadateEmployeesManager()
// function endSession()