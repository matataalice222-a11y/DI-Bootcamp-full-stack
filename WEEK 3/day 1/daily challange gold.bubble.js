
// Part 1: Converting Array to String
const numbers = [5,0,9,1,7,4,2,6,3,8];

const strFromToString = numbers.toString();
console.log(strFromToString);

console.log(numbers.join("+"));
console.log(numbers.join(" "));
console.log(numbers.join(""));

// Part 2: Bubble Sort in Descending Order
const numbersToSort = [5,0,9,1,7,4,2,6,3,8];

for (let i = 0; i < numbersToSort.length; i++) {
    for (let j = 0; j < numbersToSort.length - 1 - i; j++) {
        if (numbersToSort[j] < numbersToSort[j + 1]) {
            let temp = numbersToSort[j];
            numbersToSort[j] = numbersToSort[j + 1];
            numbersToSort[j + 1] = temp;
            console.log(`Swapped ${temp} and ${numbersToSort[j]}:`, numbersToSort);
        }
    }
}

console.log("Final Sorted Array (Descending):", numbersToSort);
````

