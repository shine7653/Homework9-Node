// const questions = [  
// ];
// function writeToFile(fileName, data) { 
// }
// function init() {
// init();

// ------------------------------------------------
// 구글맵 api -- AIzaSyBnQC_vGc42XiViyzlgG_NrE88jsBovCqI
//<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
//type="text/javascript"></script>


const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
// ./ needed when I bring a file in one folder
const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {

  inquirer
    .prompt([
      {
        type: "input",
        message: "What's your name?",
        name: "name"
      },
      {
        type: "input",
        message: "What's your favorite color?",
        name: "color",
        choices: [
          "green",
          "blue",
          "pink",
          "red"
      ]},
      {
        type: "input",
        message: "Enter your GitHub username?",
        name: "username"
      },
      {
        type: "input",
        message: "Where are you from?",
        name: "location"
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
          console.log(htmlStr);

    // write the html to a file

          writeFileAsync("index.html", htmlStr, function (err) {
            if (err) {
              throw err;
            }
             console.log(`Saved ${repoNames.length} repos`);

            // convert that into pdf


          });
        })
    });

}




// ------------------------------------------------------
// .then(function(answers) {

//   const queryUrl= `https://api.github.com/users/${answers.username}`;

//   axios
//   .get(queryUrl)
//   .then(function(res) {

// this.avatar = res.data.avatar_url;
// this.name = res.data.name;

// this.location = res.data.location;
// this.github = res.data.html_url;
// this.blog = res.data.blog;

// this.repos = res.data.public_repos;
// this.followers = res.data.followers;
// this.starred = res.data.starred_url;
// this.following = res.data.following;

// console.log(`Avatar ${avatar}`);
// console.log(`name ${name}`);
// console.log(`Location ${location}`);
// console.log(`Github ${github}`);
// console.log(`followers ${followers}`);
// console.log(`starred ${starred}`);
// console.log(`following ${following}`);

// const repoNames = answers.data.map(function(repo) {
// return repo.name;
// });

// const repoStr = repoNames.join("\n");



// });
// .catch(function(err){
// console.log(err);
// });    



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
