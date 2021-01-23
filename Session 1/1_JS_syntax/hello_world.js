console.log("Hello world!");

/*----------------------------------------------------------------------------*/
const name1 = "Javascript";
{
    let name2 = "Javascript"; // "let" defines a variable within scope ...
    var name3 = "Hamster";
}
const name4 = "Hamster";

var name2 = "Java"; // Comment this out, then "name2" is undefined
name3 = "Ham"; // var name3 = "Ham" will return an error

console.log(name1 + " to " + name2 + " is like " + name3 + " to " + name4 + ".");
/*----------------------------------------------------------------------------*/
function factorial(a){
    a = Math.round(a);
    if(a <= 0) {
        return 1;
    }
    return a*factorial(a-1);
}

console.log(factorial(5));

let myfun = factorial;
console.log(myfun(5));

let myfun2 = (a)=>{
    a = Math.round(a);
    if(a <= 0) {
        return 1;
    }
    return a*factorial(a-1)};
console.log(myfun2(5));

/*-------------------------------------------------------------------------------*/
let X = [...Array(10).keys()];
let Y = X.map((x)=>(x*x));
let Z = Y.reduce((y1,y2)=>y1+y2);
console.log(X);
console.log(Y);
console.log(Z);