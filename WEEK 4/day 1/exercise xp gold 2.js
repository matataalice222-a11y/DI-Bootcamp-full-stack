// Exercise 1: Sum elements
const numbers = [10, 20, 30, 40];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum);

// Exercise 2: Remove duplicates
const numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbersWithDuplicates)];
console.log(uniqueNumbers);

// Exercise 3: Remove falsy values
const sampleArray = [NaN, 0, 15, false, -22, '', undefined, 47, null];
const cleanArray = sampleArray.filter(Boolean);
console.log(cleanArray);

// Exercise 4: Repeat a string without using String.prototype.repeat()
function repeat(string, count = 1) {
    let result = '';

    for (let index = 0; index < count; index += 1) {
        result += string;
    }

    return result;
}

console.log(repeat('Ha!', 3));
console.log(repeat('Hey!'));

// Exercise 5: Turtle and Rabbit
const startLine = '     ||<- Start line';
let turtle = '🐢';
let rabbit = '🐇';
turtle = turtle.padStart(9);
rabbit = rabbit.padStart(9);
console.log(startLine);
console.log(turtle);
console.log(rabbit);
console.log(turtle.trim().padEnd(9, '='));