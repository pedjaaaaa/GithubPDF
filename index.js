const genHtml = require('./generateHTML');
const fs = require('fs');
const axios = require('axios');
const util = require('util');
const inquirer = require('inquirer');
const pdf = require('html-pdf');

const writeFileAsync = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile);

const questions = [{
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ['green', 'blue', 'pink', 'red'],
},
{
    type: "input",
    name: "github",
    message: "What is your GitHub username?",

}];

function init() {
    inquirer.prompt(questions)
        .then(function (input) {

            username = input.github;
            favColor = input.color;

            const githubUrl = `https://api.github.com/users/${username}`;
            return githubUrl;
        })
        .then(function (githubUrl) {
            axios.get(githubUrl).then(function (resp) {
                resp.data.color = favColor;
                pullStars(resp.data)
            })
                .then(function () {
                    console.log("Successfully wrote to index.html");
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
}


function pullStars(res) {
    const repoUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios.get(repoUrl).then(function (repo) {
        let stars = 0;
        // console.log(repo.data);

        //     repo.data.stargazers_count.reduce(function(acc, val) {return acc + val;}, 0)
        // )

        for (var i = 0; i < repo.data.length; i++) {
            const starGazers = [];
            starGazers.push(repo.data[i].stargazers_count);
            console.log(starGazers);

            for (var i = 0; i < starGazers.length; i++) {
                stars += starGazers[i];
                return stars
            };
            res.stars = stars
        }
    })
    build(res);
}

function build(res) {
    const html = genHtml(res);
    writeFileAsync("index.html", html);
    convertPdf(html);
}

function convertPdf(htmlToPdf) {
    options = { format: 'Letter' };
    pdf.create(htmlToPdf, options).toFile('./resume.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    })
}


init();


