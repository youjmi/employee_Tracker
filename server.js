const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require("console.table")

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'password',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View Roles',
                'View Department',
                'View Managers',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    viewAll();
                    break;

                case 'View Roles':
                    viewRoles()


                case 'View Department':
                    viewDepts();
                    break;

                case 'View Managers':
                    viewManager();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployee();
                    break;

                case 'Update Employee Manager':
                    updateManager();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

//List all Employees
const viewAll = () => {
    const query =
        'select id, first_name, last_name from employee'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("--------------------------------------")
        console.table(res)
    });
    runSearch();
};

///FIND WHAT ISSUE HERE IS. IT COMBINES SEPARATELY WITH ROLE AND DEPARTMENTS
const viewRoles = () => {
    const query =
        'select title, salary, department_id from role'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------------------------")
        console.table(res)
    });
    runSearch();
};


//Lists Employees per Department 
const viewDepts = () => {
    const query =
        'select name from department'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------------------------")
        console.table(res)
    });
    runSearch();
};

const viewManager = () => {
    const query = 'Select * from employee where manager_id'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------------------------")
        console.table(res)
    });
    runSearch();
};

//ADD EMPLOYEE
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            input: "input",
            message: "First Name:",
            validate(entryInput) {
                if (entryInput) {
                    return true
                }
                else {
                    return "PUT THE FIRST NAME"
                }
            }
        },
        {
            name: "last_name",
            input: "input",
            message: "Last Name:",
            validate(entryInput) {
                if (entryInput) {
                    return true
                }
                else {
                    return "PUT THE LAST NAME"
                }
            }
        },
        {
            name: "role_id",
            input: "input",
            message: "Role ID:",
            validate: (entryInput) => {
                if (/^([1-9])$/.test(entryInput)) {
                    return true
                }
                else {
                    return "Please put a number between 1-9 only!"
                }
            }
        },
        {
            name: "manager_id",
            input: "input",
            message: "Manager ID:",
            validate: (entryInput) => {
                if (/^([1-9])$/.test(entryInput)) {
                    return true
                }
                else {
                    return "Please put a number between 1-9 only!"
                }
            }
        },
    ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log("New Employee has been added!"),
                        runSearch()
                }
            )
        })

}

//REMOVE EMPLOYEE
const removeEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            input: "input",
            message: "What is the first name of the employee you want to REMOVE:",
            validate(entryInput) {
                if (entryInput) {
                    return true
                }
                else {
                    return "PUT THE FIRST NAME"
                }
            }
        },
        {
            name: "last_name",
            input: "input",
            message: "What is the last name of the employee you want to REMOVE:",
            validate(entryInput) {
                if (entryInput) {
                    return true
                }
                else {
                    return "PUT THE LAST NAME"
                }
            }
        },
        // {
        //     name: "confirmDELETE",
        //     input: "confirm",
        //     message: `Are you sure you want to delete ${employee.first_name}?`,
        // },
        

    ])
    // .then((answer) => {
    //     connection.query(
    //         'DELETE FROM employee where first_name = ?',
    //         {
    //             first_name: answer.first_name,
    //         },
    //         (err) => {
    //             if (err) throw err;
    //             console.log("Employee has been REMOVED!"),
    //             runSearch()
    //         }
    //     )
    // })

    // connection.query(
    //     'DELETE FROM employee WHERE first_name, last_name',
    // )
}

// const updateEmployee = () =>{

// }


