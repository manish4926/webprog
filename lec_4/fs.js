//npm init -y
//npm install cheerio

const fs = require("fs");
const cheerio = require("cheerio");

let htmlData = fs.readFileSync("./index.html", "utf-8");

//console.log(htmlData);
let myDocument = cheerio.load(htmlData);

let h2Element = myDocument("h1").text();

console.log(h2Element);