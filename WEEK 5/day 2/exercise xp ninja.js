"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Implement the function using function overloading to leverage the conditional return type
function mapType(value) {
    if (typeof value === "number") {
        return (value * value); // Square the number
    }
    else {
        return (value.length); // Return string length
    }
}
// Test the Function
const numResult = mapType(5); // Output: 25 (Type: number)
const strResult = mapType("Hello"); // Output: 5 (Type: number)
console.log(numResult);
console.log(strResult);
// Define a function using keyof and lookup types
function getProperty(obj, key) {
    return obj[key];
}
// Test the Function
const user = {
    id: 1,
    name: "Alice",
    isActive: true
};
const userName = getProperty(user, "name"); // Type is string
const userId = getProperty(user, "id"); // Type is number
console.log(userName); // Output: Alice
console.log(userId); // Output: 1
// Implement the function
function multiplyProperty(obj, key, factor) {
    return obj[key] * factor;
}
// Test the Function
const scores = {
    math: 85,
    english: 90,
    science: 88
};
const adjustedScore = multiplyProperty(scores, "math", 1.1);
console.log(adjustedScore); // Output: 93.5
//# sourceMappingURL=exercise%20xp%20ninja.js.map