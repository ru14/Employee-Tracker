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

db.connect((err) =>{
    if (err) {
        throw err;
    }

    console.log(`connected at: ${db.threadId}`);
    runSearch()
});

function addEmployees(){
    db.query('SELECT title,id FROM ROLES', function(err,response){
        
        let roleChoices = response.map(({title, id})=>({
            title,
            id:id

        }));
        console.log(roleChoices);
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter first name of employee:"
            },{
            
                    type: "input",
                    name: "manager_id",
                    message: "Enter manager id?:"
            },{
        
                type: "input",
                name: "Last_name",
                message: "Enter last name of employee:"
            }, {
                type: "list",
                message: "Assign employee role:",
                name: "role",
                choices: roleChoices
            }]).then((answer)=>{
        
       const query = 'INSERT INTO EMPLOYEE (first_name,last_name,roles_id,manager_id) VALUE(?,?,?,?)'
    
       db.query(query, [answer.first_name,answer.last_name,answer.role.id,answer.manager_id],function(err,res){
        if(err) throw err;
        //console.log({res})
        console.table(`${employee.first_name, employee.last_name}added`, res);
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



function viewDepartments(){
    db.query("Select id, dept_name, utilized_budget FROM DEPARTMENT", function(err, res){
        if(err) throw err;
        console.table("DEPARTMENT", res);
        runSearch();
       
    });
};

function veiwAllEmployees(){
    let query = "SELECT employee.id, employee.first_name, employee.last_name, employee.employee_dept FROM EMPLOYEE";
//console.log({query})

    db.query(query, function(err,res){
        if (err) throw err;
        //console.log({res})
        console.table('All Employees', res);
        runSearch()

    })
};
// const viewAllRoles = function (){
//     let query = "SELECT employee.role";
//     query += "FROM EMPLOYEE";

//     db.query(query, function(err,res){
//         if(err) throw err;
//         console.table('All Employees', res);
//         return res;
//     })
//};

function viewEmployeeByDept(){
    let query = " SELECT department.dept_name,employee.id, employee.first_name, employee.last_name ";
    query += " FROM DEPARTMENT ";
    query += " INNER JOIN EMPLOYEE ON employee.employee_dept = department.dept_name ";
    query += " ORDER BY department.dept_name ";
    //console.log({query})
    db.query(query, function(err,res){
        if(err)throw err;
        //console.log({res})
        console.table('Employees By Department', res);
        runSearch()
    })
};
function viewEmployeeByManager(){
    let query = " SELECT manager.id, manager.manager_name, employee.first_name, employee.last_name ";
    query += " FROM MANAGER ";
    query += " INNER JOIN EMPLOYEE ON manager.id = employee.manager_id ";
    query += " ORDER BY manager.manager_name ";
    //console.log({query})
    db.query(query, function(err,res){
        if(err) throw err;
        //console.log({res})
        console.table('Employees By Manager', res);
        runSearch()
    })
};




// function upadateEmployees(){
// function endSession()