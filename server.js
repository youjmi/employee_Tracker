const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')
// const boxen = require ('boxen')

//CONSOLE LOG STYLING- 'JEEZY'S EMPLOYEE TRACKER'
const figlet = require ('figlet')


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

//CONNECTED
connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

//CONSOLE LOG STYLING WHEN APP IS ACTIVATED
console.log(figlet.textSync("Jeezy"+"'"+'s'+'  '+'Employee Tracker!', {
    font:'Standard',
    horizontalLayout:'default',
    verticalLayout:'default'
}));

//MAIN MENU
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
                'View Budget per Department',
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
                    updateRole(); //done
                    break;

                case 'Update Employee Manager':
                    updateManager(); //done
                    break;

                case 'View Budget per Department':
                    budgetDept(); //done
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

//LISTING ALL THE EMPLOYEES
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
//LISTING ALL THE ROLES
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


//LISTING ALL DEPARTMENTS
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

//BONUS-   * View employees by manager
const viewManager = () => {
    const query = 
    'Select * from employee where manager_id'
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------------------------")
        console.table(res)
    });
    runSearch();
};

//ADD YOUR DEPARTMENT
const addDept = () => {
    inquirer.prompt([

        {
            name: "dept_name",
            input: "input",
            message: "Department Name:",
            validate(entryInput) { //VALIDATION FUNCTION
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
                    console.log(`New Department, ${answer.dept_name} has been added!`),
                        runSearch()
                }
            )
        })
}

//ADD YOUR ROLE
const addRole = () => {
    inquirer.prompt([

        {
            name: "title",
            input: "input",
            message: "Role Title:",
            validate(entryInput) { //VALIDATION FUNCTION
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
                if (!isNaN(entryInput)) { //VALIDATION FUNCTION
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
            validate: (entryInput) => { //VALIDATION FUNCTION
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


//ADD YOUR EMPLOYEE
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            input: "input",
            message: "First Name:",
            validate(entryInput) { //VALIDATION FUNCTION
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
            validate(entryInput) { //VALIDATION FUNCTION
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
            validate: (entryInput) => { //VALIDATION FUNCTION
                if (/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(entryInput)) {
                return true
            }
            else {
                return "Please put a number between 1-100!"
            }

            }
        },
        {
            name: "manager_id",
            input: "input",
            message: "Manager ID:",
            validate: (entryInput) => { //VALIDATION FUNCTION
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
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log(`New Employee,${answer.first_name} has been added!`),
                        runSearch()
                }
            )
        })

}

//BONUS - *REMOVE ROLE//
const removeRole = () => {
    connection.query('select * from role', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "role_id",
                input: "input",
                message: "Role ID you wish to REMOVE: ",
                validate: (entryInput) => { //VALIDATION FUNCTION
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
                        id: answer.role_id,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log(`Role : ${answer.role_id} has been REMOVED!`),
                            runSearch()
                    }
                )
            })
    })
}

//BONUS - REMOVE DEPARTMENT//
const removeDept = () => {
    connection.query('select * from department', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "dept_id",
                input: "input",
                message: "Department ID you wish to REMOVE: ",
                validate: (entryInput) => { //VALIDATION FUNCTION
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
                        id: answer.dept_id,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log(`Department ${answer.dept_id} has been REMOVED!`),
                            runSearch()
                    }
                )
            })
    })
}


//BONUS - REMOVE EMPLOYEE
const removeEmployee = () => {
    connection.query('select * from employee', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "emp_id",
                input: "input",
                message: "Employee ID you wish to REMOVE: ",
                validate: (entryInput) => { //VALIDATION FUNCTION
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
                        id: answer.emp_id,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log(`Employee ID ${answer.emp_id} has been REMOVED!`),
                            runSearch()
                    }
                )
            })
    })

}

//UPDATE ROLE FOR EMPLOYEE
const updateRole = () => {
    connection.query('select id, first_name, last_name, role_id from employee', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "updateID",
                input: "input",
                message: "What is the Employee ID you want to update?",
                validate: (entryInput) => { //VALIDATION FUNCTION
                    if (/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(entryInput)) {
                    return true
                }
                else {
                    return "Please put a number between 1-100!"
                }

                }

            },

            {
                name: "newRole",
                input: "input",
                message: "What is the NEW role ID?",
                validate: (entryInput) => { //VALIDATION FUNCTION
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

//BONUS - Update each employee's managers.//
const updateManager = () => {
    connection.query('select id, first_name, last_name, manager_id from employee', (err, res) => {
        console.log(res)
        if (err) throw err
        inquirer.prompt([
            {
                name: "updateID",
                input: "input",
                message: "What is the Employee ID of the current Manager you wish to UPDATE?",
                validate: (entryInput) => { //VALIDATION FUNCTION
                    if (/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(entryInput)) {
                    return true
                }
                else {
                    return "Please put a number between 1-100!"
                }

                }

            },

            {
                name: "newManager",
                input: "input",
                message: "What is the NEW Manager ID?",
                validate: (entryInput) => { //VALIDATION FUNCTION
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

// BONUS  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department
const budgetDept = () => {
    connection.query ("select department.id,department.name,sum(role.salary) as 'DEPARTMENT BUDGET' from department inner join role on department.id=role.department_id group by department.id, department.name"
    , (err,res)=> {
        console.log(res)
        if (err) throw err
        console.log("--------------------------------------")
        console.table(res)
    })
    runSearch()
}

