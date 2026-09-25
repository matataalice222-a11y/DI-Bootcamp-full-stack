
// products.js
const products = [
  { name: "Laptop", price: 1200, category: "Electronics" },
  { name: "Shoes", price: 80, category: "Fashion" },
  { name: "Book", price: 20, category: "Education" }
];

module.exports = products; // CommonJS export
`
// shop.js
const products = require("./products");

function findProduct(productName) {
  const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
  return product ? product : "Product not found!";
}

console.log(findProduct("Laptop"));
console.log(findProduct("Shoes"));
console.log(findProduct("Book"));
```






// data.js
export const people = [
  { name: "Alice", age: 25, location: "Nairobi" },
  { name: "Bob", age: 30, location: "London" },
  { name: "Charlie", age: 35, location: "New York" }
];
```

// app.js
import { people } from "./data.js";

function averageAge(persons) {
  const total = persons.reduce((sum, p) => sum + p.age, 0);
  return total / persons.length;
}

console.log("Average Age:", averageAge(people));
```

// fileManager.js
const fs = require("fs");

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

module.exports = { readFile, writeFile };
```



// app.js
const { readFile, writeFile } = require("./fileManager");

const helloContent = readFile("Hello World.txt");
console.log("Read from Hello World.txt:", helloContent);

writeFile("Bye World.txt", "Writing to the file");
console.log("Updated Bye World.txt successfully!");
```

// todo.js
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task, completed: false });
  }

  completeTask(task) {
    const found = this.tasks.find(t => t.task === task);
    if (found) found.completed = true;
  }

  listTasks() {
    return this.tasks;
  }
}

// app.js
import { TodoList } from "./todo.js";

const myTodos = new TodoList();
myTodos.addTask("Learn Node.js");
myTodos.addTask("Practice ES6 Modules");
myTodos.completeTask("Learn Node.js");

console.log(myTodos.listTasks());
```

---


// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };
```
// app.js
const _ = require("lodash");
const { add, multiply } = require("./math");

console.log("Addition:", add(5, 3));
console.log("Multiplication:", multiply(4, 2));
console.log("Sum using lodash:", _.sum([10, 20, 30]));
```


// app.js
const chalk = require("chalk");

console.log(chalk.blue("Hello World in Blue!"));
console.log(chalk.green.bold("Success Message!"));
console.log(chalk.red.underline("Error Message!"));
```



// copy-file.js
const fs = require("fs");

const content = fs.readFileSync("source.txt", "utf8");
fs.writeFileSync("destination.txt", content);

console.log("File copied successfully!");
```

// read-directory.js
const fs = require("fs");

const files = fs.readdirSync(".");
console.log("Files in directory:", files);
```

