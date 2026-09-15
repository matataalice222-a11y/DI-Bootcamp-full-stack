
// Define a conditional type mapping
type MappedType<T> = T extends number ? number : T extends string ? number : never;

// Implement the function using function overloading to leverage the conditional return type
function mapType<T extends number | string>(value: T): MappedType<T> {
    if (typeof value === "number") {
        return (value * value) as MappedType<T>; // Square the number
    } else {
        return (value.length) as MappedType<T>;  // Return string length
    }
}

// Test the Function
const numResult = mapType(5);       // Output: 25 (Type: number)
const strResult = mapType("Hello"); // Output: 5 (Type: number)

console.log(numResult);
console.log(strResult);



// Define a function using keyof and lookup types
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Test the Function
const user = {
    id: 1,
    name: "Alice",
    isActive: true
};

const userName = getProperty(user, "name"); // Type is string
const userId = getProperty(user, "id");       // Type is number

console.log(userName); // Output: Alice
console.log(userId);   // Output: 1





// Define an interface with numeric properties (index signature)
interface HasNumericProperty {
    [key: string]: number;
}

// Implement the function
function multiplyProperty(obj: HasNumericProperty, key: string, factor: number): number {
    return obj[key] * factor;
}

// Test the Function
const scores: HasNumericProperty = {
    math: 85,
    english: 90,
    science: 88
};

const adjustedScore = multiplyProperty(scores, "math", 1.1);
console.log(adjustedScore); // Output: 93.5
