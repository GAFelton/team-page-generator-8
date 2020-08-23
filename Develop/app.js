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
const employeeList = [];

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
    message: "Please enter the Employee's Email:",
    validate: function (value) {
        var pass = value.match(
            /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
          );
          if (pass) {
            return true;
          }
    
          return 'Please enter a valid Email Address';
        },
},
{
    type: "input",
    name: "officeNumber",
    message: "Please enter the Employee's Office Number:",
    validate: function (value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
    },
    filter: Number,  
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

function convertToClass(data) {
if (data.role === "Manager") {
    const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    return manager;
}
if (data.role === "Engineer") {
    const engineer = new Engineer(data.name, data.id, data.email, data.github);
    return engineer;
}
if (data.role === "Intern") {
    const intern = new Intern(data.name, data.id, data.email, data.school);
    return intern;
}
}

async function enterEmployee() {
    const newEmployee = await inquirer
        .prompt(questions);
    let employeeObj = convertToClass(newEmployee);
    console.log(employeeObj);
    console.log("\n The above entry was added to the team list.");
    employeeList.push(employeeObj);
}
// enterEmployee();

async function readyToRender() {
    await enterEmployee();
    const {renderConfirm} = await inquirer.prompt([{
        type: "confirm",
        name: "renderConfirm",
        message: "Have you finished entering employees and are ready to render your team.html document?",
        default: false,
    }]);
    if (renderConfirm === false) {
        return readyToRender();
    }
    else if (renderConfirm === true) {
        const htmlDoc = render(employeeList);
        fs.writeFile(outputPath, htmlDoc, function(err) {

            if (err) {
              return console.log(err);
            }
          
            console.log("Success! Please find the file 'team.html' in the output folder. \n Warning: If you run this application again, it will overwrite any file named 'team.html' left in the output folder. Please remove the file you created or copy it to save your work.");
          
          });
          
    }
    else {console.error(err);};
}

init = () => {
    console.log("Welcome to the Team page Generator! Enter employees in any order and this program will create a 'team.html' file in the output folder. Please enter your first employee.");
    readyToRender();
}
init();

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