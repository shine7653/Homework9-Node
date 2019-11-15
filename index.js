// const questions = [  
// ];
// function writeToFile(fileName, data) { 
// }
// function init() {
// init();

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const convertFactory = require('electron-html-to');
// ./ needed when I bring a file in one folder
const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {

  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter your GitHub username?",
        name: "username"
      },
      {
        type: "list",
        message: "What's your favorite color?",
        name: "color",
        choices: [
          "green",
          "blue",
          "pink",
          "red"
        ]
      }
    ])
    .then(function (answers) {
      console.log(answers);

      const queryUrl = `https://api.github.com/users/${answers.username}`;

      axios
        .get(queryUrl)
        .then(function (res) {
          // console.log(res.data);

          res.data.color = answers.color
          const htmlStr = generateHTML(res.data);
          // console.log(htmlStr);

          // write the html to a file
          writeFileAsync("index.html", htmlStr, function (err) {
            if (err) {
              throw err;
            }
            console.log(`html generated`);

          // convert that into pdf -----------------------------
          var conversion = convertFactory({
            converterPath: convertFactory.converters.PDF
          });

          conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
            if (err) {
              return console.error(err);
            }

          });
        })    

      // const queryUrl = `https://api.github.com/users/${answers.username}`;

      // axios
      //   .get(queryUrl)
      //   .then(function (res) {

    });
  });
 }


// 구글맵 api -- AIzaSyBnQC_vGc42XiViyzlgG_NrE88jsBovCqI
//<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
//type="text/javascript"></script>


promptUser();
// -----------------------------------------
/*
const axios = require("axios");
const inquirer = require("inquirer");

repoNames();

async function repoNames() {
  try {
    const {info} = await inquirer.prompt({
      message: "What's your name:",
      name: "name"
    });
    const {data} = await axios.get (
      `http://api.github.com/users/${answers}/repo?per_page=100`
    );
    console.log(data);
  } catch (err) {
    console.lof(err);
  }
} */
// ------------------------------------------
