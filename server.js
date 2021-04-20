const mysql = require("mysqul");
const inquirer = require("inquirer");
const consoleTable = ("console.table");

let db = mysql.creatConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

db.connect(function(err){
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    
});