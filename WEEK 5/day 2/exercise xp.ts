
function processValue(value: string | number): string {
    if (typeof value === "number") {
        // Format number as currency with 2 decimal places
        return `$${value.toFixed(2)}`;
    } else {
        // Reverse the string
        return value.split("").reverse().join("");
    }
}

// Test the Function
console.log(processValue(100));     // Output: $100.00
console.log(processValue("hello")); // Output: olleh



function sumNumbersInArray(arr: (number | string)[]): number {
    let sum = 0;
    for (let item of arr) {
        // Type guard to check if the item is explicitly a number
        if (typeof item === "number") {
            sum += item;
        }
    }
    return sum;
}

// Test the Function
const mixedArray = [10, "hello", 20, "30", 5];
console.log(sumNumbersInArray(mixedArray)); // Output: 35 (10 + 20 + 5)




// Define the Type Alias
type AdvancedUser = {
    name: string;
    age: number;
    address?: string; // Optional property
};

// Implement the Function
function introduceAdvancedUser(user: AdvancedUser): string {
    if (user.address) {
        return `Hello, my name is ${user.name}, I am ${user.age} years old, and I live at ${user.address}.`;
    } else {
        return `Hello, my name is ${user.name} and I am ${user.age} years old.`;
    }
}

// Test the Function
const userWithAddress: AdvancedUser = { name: "Alice", age: 25, address: "123 Main St" };
const userWithoutAddress: AdvancedUser = { name: "Bob", age: 30 };

console.log(introduceAdvancedUser(userWithAddress));    // Output includes address
console.log(introduceAdvancedUser(userWithoutAddress)); // Output without address



// Implement the Function with a default parameter value
function welcomeUser(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

// Test the Function
console.log(welcomeUser("Alice", "Welcome")); // Output: Welcome, Alice!
console.log(welcomeUser("Bob"));             // Output: Hello, Bob!

