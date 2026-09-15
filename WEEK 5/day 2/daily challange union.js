"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUnionType(value, allowedTypes) {
    const valueType = typeof value;
    // Check if the type of the value matches any of the allowed types in the array
    for (let i = 0; i < allowedTypes.length; i++) {
        if (valueType === allowedTypes[i]) {
            return true;
        }
    }
    return false;
}
// Alternatively, using the built-in Array.prototype.includes method:
// function validateUnionType(value: any, allowedTypes: string[]): boolean {
//     return allowedTypes.includes(typeof value);
// }
// --- Demonstration / Usage ---
const age = 25;
const username = "Alice";
const isActive = true;
console.log(validateUnionType(age, ["string", "number"])); // true (age is a number)
console.log(validateUnionType(username, ["boolean", "object"])); // false (username is a string)
console.log(validateUnionType(isActive, ["string", "boolean"])); // true (isActive is a boolean)
//# sourceMappingURL=daily%20challange%20union.js.map