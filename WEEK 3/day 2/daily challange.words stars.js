
const input = prompt("Enter several words separated by commas:");

const words = input.split(",").map(word => word.trim());

let maxLength = 0;
for (let word of words) {
    if (word.length > maxLength) {
        maxLength = word.length;
    }
}

const border = "*".repeat(maxLength + 4);

console.log(border);

for (let word of words) {
    const paddedWord = word.padEnd(maxLength, " ");
    console.log(`* ${paddedWord} *`);
}

console.log(border);
````

