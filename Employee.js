const inquirer = require("inquirer");

async function addEmployees() {
    try {
        const userInput = await inquirer.prompt([
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
                message: "Assign employee role:",
                name: "role",
                choices: [
                    ...role//write out these choices
                ]
            }]);
        //take the userInput variable, which will be an object containing the user's response, then put that response into a db.query to INSERT INTO db using those values
    
}

catch (err) {
    console.log({ err })
}
};

async function acquireRemoveEmployeesInfo() {

    return inquirer.prompt([
        {

            type: "list",
            message: "Select employee to be removed:",
            name: "employee",
            choices: [
                ...employee
            ]
        }
    ])
};

async function updteEmployeeRole() {
    const roles = await obtainRoles();

    return inquirer.prompt([
        {

            type: "list",
            message: "Select a new role for employee:",
            name: "role",
            choices: [
                ...roles
            ]
        }
    ])
};

async function addDepartment() {
    const roles = await obtainRoles();

    return inquirer.prompt([
        {
            type: "input",
            message: "Enter new department name:",
            name: "department"
        }
    ])
};


async function addNewRole() {
    const depts = await obtainDepartmentName();
    console.log(depts)
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter title of new role:",
            name: "role"
        }, {
            type: "input",
            message: "Enter salary of new role:",
            name: "salary"
        }, {
            type: "list",
            message: "Assign new role to an present department:",
            name: "department",
            choices: [
                ...depts
            ]
        }
    ])
};

module.exports = { addEmployees, addDepartment, addNewRole, updteEmployeeRole, acquireRemoveEmployeesInfo }