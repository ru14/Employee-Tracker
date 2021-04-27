const inquirer = require("inquirer");

async function addEmployees (){
const manager = await obtainManagerName();
const role = await obtainRoles();
return inquirer.prompt([
    {
        type:"input",
        name:"first_name",
        message: "Enter first name of employee:"
    },{
        type:"input",
        name:"Last_name",
        message: "Enter last name of employee:"
    },{
        type: "list",
        message:"Assign employee role:",
        name: "role",
        choices:[
            ...role
        ]
    },{
        type: "list",
        message:"Assign Manager role:",
        name: "Manager",
        choices:[
            ...manager
        ]
    }
])
};

async function acquireRemoveEmployeesInfo(){
    
   return inquirer.prompt([
       {

        type: "list",
        message:"Select employee to be removed:",
        name: "employee",
        choices:[
            ...employee
        ]
       }
   ])
};

async function updteEmployeeRole(){
    const roles=await obtainRoles();

    return inquirer.prompt([
        {
 
         type: "list",
         message:"Select a new role for employee:",
         name: "role",
         choices:[
             ...roles
         ]
        }
    ])
 };

