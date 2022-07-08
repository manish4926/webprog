console.log('hello world');

//Data Types => 
// Java => Primitives => int, float, double, Boolean
// Non Premetive => array, stacks

// Javascript int, float, number, double, boolean, string, undefined, null, object

//ES6 => Ecma Script
let a = 10; //Dynamic casting => block scoped => value not continue after block or condition
const b = 20;

//eg:

let vari = 10;
console.log(vari);
if(true) {
    let vari = 20;
    console.log(vari);
}
console.log(vari);

// Output: 
// 10
// 20
// 10

let vari1 = 10;
console.log(vari);
if(true) {
    vari1 = 20;
    console.log(vari1);
}
console.log(vari1);

// Output: 
// 10
// 20
// 20


// const =>  blocked and constant
const pi = 3.14;
console.log(pi);

// Arrays
// Java => int [] = new int[5]

let values = [1,2,3,4,5,6];
console.log(values);

// Add element at end
values.push("Test var");
console.log(values);

values.pop();
console.log(values);


// Array shift 

// values.shift() - Delete values
// values.unshift("new var") - Add element


 values.unshift("new var");
 console.log(values);
 values.shift();
 console.log(values);

 //Splice - instrt and get and delete element from inbtween array
 console.log(values.splice(2,1));
 console.log(values);

//  Object
let obj = {
    name : "manish",
    place : "delhi",
    movie : "captain america"
}

console.log(obj.name);
console.log(obj.movie);

// dot operator check literals
let key = "place";
console.log(obj[key]);
