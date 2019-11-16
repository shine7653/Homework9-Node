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
// const convertFactory = require('electron-html-to');
// ./ needed when I bring a file in one folder
const generateHTML = require("./generateHTML");
const writeFileAsync = util.promisify(fs.writeFile);
// const puppeteer = require('puppeteer');
// const fs = require('fs-extra');
const pdf = require('html-pdf');

const ques = [
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
];

function promptUser() {

  inquirer
    .prompt(ques)
    .then(function (input) {
      // console.log(answers);
      username = input.username;
      favColor = input.color;

      const queryUrl = `https://api.github.com/users/${username}`;
      return queryUrl;
    })
    .then(function (queryUrl) {
        axios.get(queryUrl)
          .then(function (res) {
            // console.log(res.data
            res.data.color = favColor;
            calculateStars(res.data);
          })
          .then(function () {
            console.log(`Successfully wrote to index.html`);
          })
          .catch(function (err) {
            console.log(err);
          });
    });
};

function calculateStars(info) {

  const queryUrl = `http://api.github.com/users/${username}/repo?per_page=100`

  axios.get(queryUrl)
    .then(function (repo) {
      let stars = 0
      for (var i = 0; i < repo.data.length; i++) {
        stars = stars + repo.data[i].stargazers_count
      }

      info.stars = stars
      console.log(stars);
    })
    .catch(function (err) {
      console.log(err);
    });
  createAll(info);
};

function createAll(info) {
  const html = generateHTML(info);
  writeFileAsync("index.html", html);
  convertPdf(html);
};

function convertPdf(htmlPdf) {
  options = { format: 'Letter' };
  pdf.create(htmlPdf, options).toFile('./resume.pdf', function (err, res) {
    if (err)
      return console.log(err);
    console.log(res);
  })
};

promptUser();
    // const htmlStr = generateHTML(res.data);
    // // console.log(htmlStr);

    // // write the html to a file
    // writeFileAsync("index.html", htmlStr, function (err) {
    //   if (err) {
    //     throw err;
    //   }







// 구글맵 api -- AIzaSyBnQC_vGc42XiViyzlgG_NrE88jsBovCqI
//<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
//type="text/javascript"></script>


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
