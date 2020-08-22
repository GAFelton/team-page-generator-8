const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [{
    type: "input",
    name: "name",
    message: "Please enter the Employee's Name:"
},
{
    type: "list",
    name: "role",
    message: "Please select the Employee's role:",
    choices: ["Manager", "Engineer", "Intern"]
},
{
    type: "input",
    name: "id",
    message: "Please enter the Employee's ID:"
},
{
    type: "input",
    name: "email",
    message: "Please enter the Employee's Email:"
},
{
    type: "input",
    name: "officeNumber",
    message: "Please enter the Employee's Office Number:",
    when: (answers) => {
        if (answers.role === "Manager") {
            return true;
        }
    }
},
{
    type: "input",
    name: "github",
    message: "Please enter the Employee's GitHub Account:",
    when: (answers) => {
        if (answers.role === "Engineer") {
            return true;
        }
    }
},
{
    type: "input",
    name: "school",
    message: "Please enter the Employee's School:",
    when: (answers) => {
        if (answers.role === "Intern") {
            return true;
        }
    }
}
];
employeeMore = [];



// inquirer.prompt(questions).then((answers) => { console.log(answers), console.log("Failed.") });
async function enterEmployee() {
    const newEmployee = await inquirer
        .prompt(questions);
    console.log(newEmployee);
    // const employeeSpecial = await inquirer.prompt(employeeMore)
    // console.log(newEmployee + "," + employeeSpecial)
}
enterEmployee();


// init = () => {
//     console.log("Welcome to the Team page Generator! Please enter your first employee.");

// }

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


// module.exports = App;