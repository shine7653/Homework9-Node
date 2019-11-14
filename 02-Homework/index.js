// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();

// ------------------------------------------------

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync= util.promisify(fs.writeFile);

promptUser() {

return inquirer
  .prompt([
    {
        type: "input",
        message: "What's your name?",
        name: "name"
      },
    {
        type: "input",
        message: "Where are you from?",
        name: "location"
      },
    {
      type: "input",
      message: "Enter your GitHub username?",
      name: "username"
    },
    {
      type: "password",
      message: "What is your password?",
      name: "password"
    }
  ])
  .then(function(answers) {
    `http://api.github.com/users/${answers}/repo?per_page=100`;

    axios.get(queryUrl).then(function(answers) {
      const repoNames = answers.data.map(function(repo) {
      return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");
      
      fs.writeFileAsync("index,html", repoNames, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });


}