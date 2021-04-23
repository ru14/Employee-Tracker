const mysql = require("mysqul");
const inquirer = require("inquirer");
const consoleTable = ("console.table");

let db = mysql.creatConnection({
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
    inquirer.prompt(
        {
            name: "VeiwEmployee",
            type: "list",
            message: "Which devision you want to see?",
            choices: ["Veiw all departments.", "View all employees.", "Veiw all employees by department.", "Veiw all employees by manager."]
        })
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
    });
};
function veiwAllEmployees()
function viewEmployeeByDept()
function viewEmployeeByManager()
function addEmployees()
function removeEmployees()
function upadateEmployees()
function upadateEmployeesManager()
function endSession()