const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = ("console.table");
const Employees = require("./Employee");


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
            choices: ["Veiw all departments.", "View all employees.", "Veiw all employees by department.", "Veiw all employees by manager.","Add employee."]
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
                case "Add employee.":
                    addEmployees();
                    break;
                case "Remove employee.":
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
async function addEmployees(){
    const rolesId = await obtainRoleId(employee.roles);
    const managerId = await obtainEmployeeId(employee.manager);
    const query = 'INSERT INTO EMPLOYEE (first_name,last_name,employee_dept,salary,roles_id,manager_id) VALUE(?,?,?,?)'
    const args = [employee.first_name, employee.last_name, roles_id, manager_id ];
    db.query(query, function(err,res){
        console.table(`${employee.first_name, employee.last_name}added`, res);
        runSearch()
    })
};
// function removeEmployees(){
//let query = "DELETE FROM EMPLOYEE WHERE first_name =? AND last_name =?";
//db.query(query, function(err,res){
//    console.table(`${employee.first_name, employee.last_name}deleted`, res);
//    runSearch()
//})
//};

function viewDepartments(){
    db.query("Select id, dept_name, utilized_budget FROM DEPARTMENT", function(err, res){
        if(err) throw err;
        console.table("DEPARTMENT", res);
        runSearch();
       
    });
};
function veiwAllEmployees(){
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name";
    query += "FROM EMPLOYEE";
    query += "INNER JOIN DEPARTMENT ON employee.employee_dept = department.dept_name"
    query += "INNER JOIN ROLES ON department.id = roles.department_id";
    query += "INNER JOIN MANAGER ON employee.manager_id = manager.id";

    db.query(query, function(err,res){
        console.table('All Employees', res);
        runSearch()
    })
};
function viewEmployeeByDept(){
    let query = "SELECT department.dept_name,employee.id, employee.first_name, employee.last_name";
    query += "FROM DEPARTMENT";
    query += "INNER JOIN EMPLOYEE ON employee.employee_dept = department.dept_name";
    query += "ORDER BY department.dept_name";
    db.query(query, function(err,res){
        console.table('Employees By Manager', res);
        runSearch()
    })
};
function viewEmployeeByManager(){
    console.log("View Employees By Manager");
    let query = "SELECT manager.id, manager.manager_name, employee.first_name, employee.last_name";
    query += "FROM MANAGER";
    query += "INNER JOIN EMPLOYEE ON manager.id = empolyee.manager.id";
    query += "ORDER BY manager.manager_name";
    db.query(query, function(err,res){
        console.table('Employees By Manager', res);
        runSearch()
    })
};


// function upadateEmployees(){


// function upadateEmployeesManager()
// function endSession()