const fs = require('fs'); 
const inquirer = require('inquirer');
const gs = require('github-scraper');
const puppeteer = require('puppeteer');

const questions = [
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ['green', 'blue', 'pink', 'red'],

    type: "input",
    name: "github"
    message: "What is your GitHub username?",
   
];

function writeToFile(fileName, data) {
 
};

function init() {

init();


