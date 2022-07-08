
//calling file system library
const fs = require("fs");


//read file
let fsData = fs.readFileSync("./fs.txt","utf-8");

console.log(fsData);


//write file
fs.writeFileSync("./write.txt", "Zemo is a good guy");