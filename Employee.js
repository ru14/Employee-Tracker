const inquirer = require("inquirer");


const addNewEmployees = [
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
        choices: ['Administration', 'Surgeon', 'Physican', 'Nurse', 'Cafeteria & Catering', 'Physical Therapy'
        ]
    }];

const removeEmployees = [
    {

        type: "list",
        message: "Select employee to be removed:",
        name: "employee",
        // choices: [
        //     
    }];



    // const addNewRole = [
    //     {

    //         type: "list",
    //         message: "Select a new role for employee:",
    //         name: "role",
    //         choices: [
    //             ...roles
    //         ]
    //     }];



    const addNewDepartment = [
        {
            type: "input",
            message: "Enter new department name:",
            name: "department"
        }];



    const addNewRole =[
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
            // choices: [
            //     ...depts
            // ]
        }];


module.exports = { addNewEmployees, addNewDepartment, addNewRole,  removeEmployees }