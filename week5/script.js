// console.log("Hello World");
// let myName = "Milo";
// console.log("Hello", myName);

//numerical variable 0-9 - +
let a = 10;
let b = parseInt("-20");
let c = a + b;
console.log(a, "+", b, c);
// + add - sub * multi / divide

//string or text variables ' ' " " back ticks ``
let myName = "Milo";
console.log("Hello", myName);

// Boolean variables true or false
let isSunny = false;

//object varibles
const myStudentRecord = {
  name: "Milo",
  id: 777,
  homeTown: "Melbourne",
  isLocal: true,
};
console.log(myStudentRecord);
console.log(myStudentRecord.id);

// Use ${} Vrible inside string

// Arrays start at 0
let students = ["him", "her", "They", "Them ", " It"];
console.log(students);

for (let i = 0; i < students.length; i++) {
  console.log("hello", students[i]);
}
