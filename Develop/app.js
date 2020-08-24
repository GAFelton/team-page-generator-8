// IMPORT MODULES
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Output path for the team.html final file.
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Empty repo to store generated employees before rendering the HTML.
const employeeList = [];

//Questions for user input.
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
        var valid = !isNaN(parseInt(value));
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

//Function for taking user input and using the Employee JS classes to convert it into the proper format.
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

//This function asks for user inputs, converts them to the correct Class object, then adds them to the employeeList array.
async function enterEmployee() {
    const newEmployee = await inquirer
        .prompt(questions);
    let employeeObj = convertToClass(newEmployee);
    console.log(employeeObj);
    console.log("\n The above entry was added to the team list.");
    employeeList.push(employeeObj);
}

//This function handles question logic. It calls the enterEmployee function, then asks the user to either enter another Employee or to wrap up and render the final team.html document.
async function readyToRender() {
    await enterEmployee();
    console.log(`Number of entries: ${employeeList.length}`)
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

//The init function kicks off the application and calls the question logic function readyToRender().
init = () => {
    console.log("Welcome to the Team page Generator! Enter employees in any order and this program will create a 'team.html' file in the output folder. Please enter your first employee.");
    readyToRender();
}
init();