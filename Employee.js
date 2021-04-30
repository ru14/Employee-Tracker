const inquirer = require("inquirer");




const removeEmployees = [
    {

        type: "list",
        message: "Select employee to be removed:",
        name: "employee",
        // choices: [
        //     
    }];



   function addNewRole () {
    db.query('SELECT title,id FROM ROLES',function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
        inquirer.prompt([
        {

            type: "input",
            message: "Select a new role for employee:",
            name: "role",
            choices: [
                ...roles
            ]
        }]);



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