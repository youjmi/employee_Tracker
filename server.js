const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')
// const boxen = require ('boxen')

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
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View Roles',
                'View Department',
                'View Managers',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Remove Role',
                'Remove Department',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                '-----Exit-----',

            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    viewAll(); //done
                    break;

                case 'View Roles':
                    viewRoles(); //done
                    break;

                case 'View Department':
                    viewDepts(); //done
                    break;

                case 'View Managers':
                    viewManager(); //done
                    break;

                case 'Add Department':
                    addDept(); //done
                    break;

                case 'Add Role':
                    addRole(); //done
                    break;

                case 'Add Employee':
                    addEmployee(); //done
                    break;

                case 'Remove Role':
                    removeRole(); //done
                    break;

                case 'Remove Department':
                    removeDept(); //done
                    break;

                case 'Remove Employee':
                    removeEmployee(); //done
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;

                case 'Update Employee Manager':
                    updateManager(); //done
                    break;

                case '-----Exit-----':
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

//ADD DEPT
const addDept = () => {
    inquirer.prompt([

        {
            name: "dept_name",
            input: "input",
            message: "Department Name:",
            validate(entryInput) {
                if (entryInput) {
                    return true
                }
                else {
                    return "PUT THE NAME OF DEPARTMENT"
                }
            }
        },
    ])
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.dept_name,
                },
                (err) => {
                    if (err) throw err;
                    console.log("New Department has been added!"),
                        runSearch()
                }
            )
        })
}

const addRole = () => {
    inquirer.prompt([

        {
            name: "title",
            input: "input",
            message: "Role Title:",
            validate(entryInput) {
                if (entryInput) {
                    return true
                }
                else {
                    return "PUT THE ROLE'S TITLE"
                }
            }
        },
        {
            name: "salary",
            input: "input",
            message: "Role Salary:",
            validate(entryInput) {
                if (!isNaN(entryInput)) {
                    if (!(entryInput === "")) {
                        return true
                    }
                }
                else {
                    return "PUT THE SALARY"
                }
            }
        },
        {
            name: "dept_id",
            input: "input",
            message: "Department ID:",
            validate(entryInput) {
                if (/^([1-9])$/.test(entryInput)) {
                    return true
                }
                else {
                    return "PUT THE DEPARTMENT ID"
                }
            }
        },
    ])
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.dept_id,

                },
                (err) => {
                    if (err) throw err;
                    console.log(`New Role,${answer.title} has been added!`),
                        runSearch()
                }
            )
        })
}


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




// * The command-line application should allow users to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department


//REMOVE ROLE//
const removeRole = () =>{
    connection.query ('select * from role',(err,res)=> {
        console.log(res)
        if (err) throw err
        inquirer.prompt ([
            {
                name: "role_id",
                input: "input",
                message: "Role ID: ",
                validate: (entryInput) => {
                    if (/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(entryInput)) {
                        return true
                    }
                    else {
                        return "Please put a number between 1-100!"
                    }
                }
            },

        ])
        .then((answer) => {
            connection.query(
                'DELETE FROM role WHERE ?',
                {
                    // first_name: answer.first_name,
                    // last_name: answer.last_name,
                    id: answer.role_id,
                    // manager_id: answer.manager_id
                },
                (err) => {
                    if (err) throw err;
                    console.log("Role has been REMOVED!"),
                        runSearch()
                }
            )
        })
    })
}

//REMOVE DEPARTMENT//
const removeDept = () =>{
    connection.query ('select * from department',(err,res)=> {
        console.log(res)
        if (err) throw err
        inquirer.prompt ([
            {
                name: "dept_id",
                input: "input",
                message: "Department ID: ",
                validate: (entryInput) => {
                    if (/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(entryInput)) {
                        return true
                    }
                    else {
                        return "Please put a number between 1-100!"
                    }
                }
            },

        ])
        .then((answer) => {
            connection.query(
                'DELETE FROM department WHERE ?',
                {
                    // first_name: answer.first_name,
                    // last_name: answer.last_name,
                    id: answer.dept_id,
                    // manager_id: answer.manager_id
                },
                (err) => {
                    if (err) throw err;
                    console.log("Department has been REMOVED!"),
                        runSearch()
                }
            )
        })
    })
}


//REMOVE EMPLOYEE
const removeEmployee = () => {
    connection.query('select * from employee', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "emp_id",
                input: "input",
                message: "Employee ID: ",
                validate: (entryInput) => {
                    if (/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(entryInput)) {
                        return true
                    }
                    else {
                        return "Please put a number between 1-100!"
                    }
                }
            },
        ])
            .then((answer) => {
                connection.query(
                    'DELETE FROM employee WHERE ?',
                    {
                        // first_name: answer.first_name,
                        // last_name: answer.last_name,
                        id: answer.emp_id,
                        // manager_id: answer.manager_id
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("Employee has been REMOVED!"),
                            runSearch()
                    }
                )
            })
    })

    // connection.query(
    //     'DELETE FROM employee WHERE first_name, last_name',
    // )
}

const updateRole = () => {
    connection.query('select id, first_name, last_name, role_id from employee', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "updateID",
                input: "input",
                message: "What is the Employee ID you want to update?",

            },

            {
                name: "newRole",
                input: "input",
                message: "What is the NEW role ID?"
            },
        ])

            .then((answer) => {
                connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    [
                        {
                            role_id: answer.newRole,
                        },
                        {
                            id: answer.updateID
                        },
                    ],
                    (err) => {
                        if (err) throw err;
                        console.log(`Your Role has been updated to ${answer.newRole}`)
                        runSearch()
                    }
                )

            })
    })
}

//Update each employee's managers... Some will say NULL bc they Don't have a manager..//

const updateManager = () => {
    connection.query('select id, first_name, last_name, manager_id from employee', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "updateID",
                input: "input",
                message: "What is the Employee ID you want to update?",

            },

            {
                name: "newManager",
                input: "input",
                message: "What is the NEW Manager ID?"
            },
        ])

            .then((answer) => {
                connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    [
                        {
                            manager_id: answer.newManager,
                        },
                        {
                            id: answer.updateID
                        },
                    ],
                    (err) => {
                        if (err) throw err;
                        console.log(`Your Manager ID has been updated to ${answer.newManager}`)
                        runSearch()
                    }
                )

            })
    })
}





// * The command-line application should allow users to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department
