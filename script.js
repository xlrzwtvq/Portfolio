// ➡️ 1. This is a comment
// console.log("JavaScript is working");

// ➡️ 2. Variables
// let name1 = "Amit";
// let age = 44;
// const country = "India";

// console.log("Name:", name1);
// console.log("Age:", age);
// console.log("Country", country);

// ➡️ 3. Operators
// let score = 10 + 5; //15
// let message = "Hello, " + name1;
// console.log(score);
// console.log(message);

// ➡️ 4. Conditionals
//Basic if statement:
// let age = 20;
// if(age >= 18){
//     console.log("You're an adult!");
// }

// ➡️ 5. if...else:
// let isRaining = false;
// if(isRaining){
//     console.log("Take an umbrella!");
// }else{
//     console.log("No need for an umbrella today.");
// }

// ➡️ 6. if...else if...else:
// let score = 85;
// if(score >= 90){
//     console.log("Grade: A");
// } else if(score >= 80){
//     console.log("Grade: B");
// } else{
//     console.log("Keep going, you've got this!");
// }

// ➡️ 7. Basic function:
// function greet(){
//     console.log("Hello, Amit!");
// }
// greet();

// ➡️ 8. Function with a parameter:
// function greet(name){
//     console.log("Hello, " + name + "!");
// }
// greet("Natasha");

// ➡️ 9. Function that returns something:
// function add(a, b){
//     return a + b;
// }

// ➡️ 10. let result = add(5, 3);
// console.log(result);

// ➡️ 11. A fun combo example (function + condition):
// function checkAge(age){
//     if(age >= 18){
//         return "You're eligible to vote!";
//     }else{
//         return "Too young to vote.";
//     }
// }

// console.log(checkAge(20));
// console.log(checkAge(15));

// ➡️ 12. Custom Message Based on Sport
// Goal: Print a personalized message depending on the sport.
// Concepts: functions, parameters, if/else
// function favoriteSportMessage(sport) {
//   if (sport === "tennis") {
//     console.log("You love tennis – just like Federer!");
//   } else if (sport === "table tennis") {
//     console.log("Fast reflexes! Table Tennis is awesome.");
//   } else {
//     console.log("Nice! " + sport + " is a cool sport too.");
//   }
// }
// favoriteSportMessage("Cricket");

// ➡️ 13. Simple Calculator
// Goal: Add, subtract, multiply, or divide two numbers.
// Concepts: functions, return values, if/else

// function calculate(a, b, operator) {
//   if (operator === "add") {
//     return a + b;
//   } else if (operator === "subtract") {
//     return a - b;
//   } else if (operator === "multiply") {
//     return a * b;
//   } else if (operator === "divide") {
//     return a / b;
//   } else {
//     return "Unknown operator";
//   }
// }
// console.log(calculate(10, 5, "divide"));  // 50

// ➡️ 14. Mini Quiz
// Goal: Ask a question and validate the answer.
// Concepts: functions, if/else, toLowerCase

// a.
// function quiz(answer) {
//   if (answer.toLowerCase() === "delhi") {
//     console.log("Correct! Delhi is the capital of India.");
//   } else {
//     console.log("Oops! Try again.");
//   }
// }
// quiz("delhi");

// b.

function checkCity() {
  const input = document.getElementById("cityInput").value;
  const result = document.getElementById("result");

  if (input.toLowerCase() === "delhi") {
    result.textContent = "✅ Correct! Welcome to Delhi.";
  } else {
    result.textContent = "❌ Try again!";
  }
}

function calculate(operation) {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const resultDisplay = document.getElementById("calcResult");

  let result;

  if (isNaN(num1) || isNaN(num2)) {
    resultDisplay.textContent = "Please enter valid numbers!";
    return;
  }

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
      break;
    default:
      result = "Invalid operation";
  }

  resultDisplay.textContent = `Result: ${result}`;
}