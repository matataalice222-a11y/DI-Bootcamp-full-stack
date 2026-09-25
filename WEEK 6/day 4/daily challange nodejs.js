// greeting.js
function greet(name) {
  return `Hello, ${name}! Welcome to the Daily Challenge.`;
}

module.exports = greet; // CommonJS export
// app.js
const greet = require("./greeting");

console.log(greet("Alice"));



// colorful-message.js
const chalk = require("chalk");

function showMessage() {
  console.log(chalk.blue.bold("This is a colorful message!"));
  console.log(chalk.green.underline("Node.js makes coding fun!"));
}

module.exports = showMessage;



// app.js
const showMessage = require("./colorful-message");

showMessage();
```


// read-file.js
const fs = require("fs");
const path = require("path");

function readFile() {
  const filePath = path.join(__dirname, "files", "file-data.txt");
  const content = fs.readFileSync(filePath, "utf8");
  console.log("File Content:", content);
}

module.exports = readFile;
```


// app.js
const readFile = require("./read-file");

readFile();

// challenge.js
const greet = require("./greeting");
const showMessage = require("./colorful-message");
const readFile = require("./read-file");

console.log(greet("Alice"));   // Greeting
showMessage();                 // Colorful message
readFile();                    // File content
