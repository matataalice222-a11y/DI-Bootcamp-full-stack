
const fs = require("fs");
const path = require("path");

function getFileInfo() {
  const filePath = path.join(__dirname, "data", "example.txt");

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log("File exists:", true);
    console.log("Size:", stats.size, "bytes");
    console.log("Created at:", stats.birthtime);
  } else {
    console.log("File does not exist");
  }
}

module.exports = getFileInfo;
```


const axios = require("axios");

async function fetchPosts() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    response.data.forEach(post => console.log(post.title));
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
}

module.exports = fetchPosts;
```
`
const { addDays, format } = require("date-fns");

function showDateOperations() {
  const now = new Date();
  const futureDate = addDays(now, 5);
  const formatted = format(futureDate, "yyyy-MM-dd HH:mm:ss");

  console.log("Current date:", now);
  console.log("Date + 5 days:", formatted);
}

module.exports = showDateOperations;
```
```


const { faker } = require("@faker-js/faker");

let users = [];

function addUser() {
  const user = {
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    country: faker.location.country()
  };
  users.push(user);
  console.log("User added:", user);
}

module.exports = { users, addUser };
```


const { users, addUser } = require("./faker-example");

addUser();
addUser();
console.log("All users:", users);
```


function returnNumbers(str) {
  return str.match(/\d+/g).join("");
}

console.log(returnNumbers("k5k3q2g5z6x9bn")); // Output: 532569
```


function validateName(name) {
  const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  return regex.test(name);
}

console.log(validateName("John Doe"));   // true
console.log(validateName("john doe"));   // false
console.log(validateName("JohnDoe"));    // false

