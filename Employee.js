const inquirer = require("inquirer");




const removeEmployees = [
    {

        type: "list",
        message: "Select employee to be removed:",
        name: "employee",
        // choices: [
        //     
    }];





const addNewDepartment = [
    {
        type: "input",
        message: "Enter new department name:",
        name: "department"
    }];


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


module.exports = { addNewDepartment, removeEmployees };