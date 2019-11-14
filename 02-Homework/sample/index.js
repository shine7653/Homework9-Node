const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const electron = require("electron");
const electronHTMLTo = require("electron-html-to");

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "Favorite Color",
            text: "What is your favorite color?"
        },
        {
            type: "input",
            name: "username",
            text: "Enter your GitHub username here"
        }
    ]).then(function (data) {
        console.log(data);
        axios.get(`https://api.github.com/users/${data.username}`)
            .then(function (user) {
                console.log(user.data);
            })
    })
}


promptUser();


console.log(response);
        axios.get(`https://api.github.com/users/${response.username}`)
            .then(function (user) {
                console.log(user.data);
                const joinedData = {
                    color: response.color,
                    ...user.data
                }
                console.log(joinedData);
                const html = generateHTML(joinedData);
                // console.log(html);
                writeFileAsync("index.html", html);
            })
    })
    .then(function (response) {
        const html = generateHTML(response);

        return writeFileAsync("index.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    })

function generateHTML() {
    (function generateHTML(response) {
        return `

function generateHTML(response) {
    console.log(response);
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
@@ -54,28 +54,25 @@ function generateHTML() {
            <title>Document</title>
            </head>
            <body>
            <div class="jumbotron jumbotron-fluid" styl="background-color: ${response.color}">
            <div class="jumbotron jumbotron-fluid" style="background-color: ${response.color}">
            <div class="container">
            <img href="${response.user.avatar_url}" style="size: 200px, 200px"/>
            <img href="${response.avatar_url}" style="size: 200px, 200px"/>
            <br>
            <h1 class="display-4">Hi! <br> My name is ${response.user.name}</h1>
            <h1 class="display-4">Hi! <br> My name is ${response.name}</h1>
            <ul class="list-group">
            <li class="list-group-item">GitHub: ${response.user.html_url}</li>
            <li class="list-group-item">Location: ${response.user.location}</li>
            <li class="list-group-item">GitHub: ${response.html_url}</li>
            <li class="list-group-item">Location: ${response.location}</li>
            </ul>
            <h3>${response.user.bio}</h3>
            <h3>${response.bio}</h3>
            </div>
            <div class="section">
            <h3>Public Repositories: ${response.user.public_repos}</h3>
            <h3>Followers: ${response.user.followers}</h3>
            <h3>Following: ${response.user.following}</h3>
            <h3>Starred: ${response.user.starred_url}</h3>
            <h3>Public Repositories: ${response.public_repos}</h3>
            <h3>Followers: ${response.followers}</h3>
            <h3>Following: ${response.following}</h3>
            <h3>Starred: ${response.starred_url}</h3>
            
            </div>
            </div>
            </body>
            </html>`;
    });
}

generateHTML(); 
} 