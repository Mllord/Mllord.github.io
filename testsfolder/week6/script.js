// two kinds of variables let and const
// numerical let a=10
//string let a = ""
//back ticks for multiline strings or need to have variables inside
//boolean is true or false
//objects
//let somthing = {x:10, y:"sometings"}
//arrays
//let numbers = [1,34,5,67,2,5,6]
//arrays start at 0
//
// if conditions
let a = 2023;
let b = 2453;

function whatIsMyGrade(marks) {
  if (marks > 80) {
    return "HD";
  } else if (marks < 40) {
    return "Fail";
  } else {
    return "Pass";
  }
}

function add(val1, val2) {
  let total = val1 + val2;
  //   console.log(total);
  return total;
}

function subtract(val1, val2) {
  let res = val1 - val2;
  return res;
}

let c = add(a, b);

// console.log(c);

let d = subtract(a, b);

// console.log(d);

let score = 80;
let msg = whatIsMyGrade(score);
// console.log(msg);

const header = document.querySelector("header");
console.log(header.innerHTML);
let course = "OART1013";
header.innerHTML += `<h3> This is ${course} </h3>`;
console.log(header.innerHTML);

const topheading = document.querySelector("h1");
// console.log(topheading);

topheading.textContent = "HAHAHA I HAVE TAKEN OVER";

topheading.style.color = "Crimson";

const allparagraph = document.querySelectorAll("p");
// console.log(allparagraph);
// console.log(allparagraph.textContent)
for (let i = 0; i < allparagraph.length; i++) {
  //   console.log(allparagraph[i].textContent);
  allparagraph[i].style.border = "1px solid blue";
}

const firstsubheading = document.querySelector("#firstsubheading");
// console.log(firstsubheading);
// console.log(firstsubheading.textContent);
firstsubheading.style.background = "yellow";

const but1 = document.querySelector("#but1");
but1.addEventListener("click", handleClick);

const cat = document.querySelector("#cat");

function handleClick() {
  console.log("Hey did you just click me");
  cat.classList.toggle("round");
}

cat.addEventListener("mouseenter", addme);
cat.addEventListener("mouseleave", removeme);

function addme() {
  cat.classList.add("round");
}

function removeme() {
  cat.classList.remove("round");
}
