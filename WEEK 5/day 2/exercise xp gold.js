"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processValue(value) {
    if (typeof value === "number") {
        // Format number as currency
        return `$${value.toFixed(2)}`;
    }
    else {
        // Reverse the string
        return value.split("").reverse().join("");
    }
}
// Test the Function
console.log(processValue(100)); // Output: $100.00
console.log(processValue("hello")); // Output: olleh
function sumNumbersInArray(arr) {
    let sum = 0;
    for (let item of arr) {
        // Type guard to check if the item is a number
        if (typeof item === "number") {
            sum += item;
        }
    }
    return sum;
}
const mixedArray = [10, "hello", 20, "30", 5];
console.log(sumNumbersInArray(mixedArray)); // Output: 35 (10 + 20 + 5)
// Implement the Function
function introduceAdvancedUser(user) {
    if (user.address) {
        return `Hello, my name is ${user.name}, I am ${user.age} years old, and I live at ${user.address}.`;
    }
    else {
        return `Hello, my name is ${user.name} and I am ${user.age} years old.`;
    }
}
// Test the Function
const userWithAddress = { name: "Alice", age: 25, address: "123 Main St" };
const userWithoutAddress = { name: "Bob", age: 30 };
console.log(introduceAdvancedUser(userWithAddress)); // Output includes address
console.log(introduceAdvancedUser(userWithoutAddress)); // Output without address
// Implement the Function with a default parameter value
function welcomeUser(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
}
// Test the Function
console.log(welcomeUser("Alice", "Welcome")); // Output: Welcome, Alice!
console.log(welcomeUser("Bob")); // Output: Hello, Bob!
//# sourceMappingURL=exercise%20xp%20gold.js.map