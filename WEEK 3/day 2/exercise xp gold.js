
// Exercise 1: is_Blank
function isBlank(str) {
    return str.trim().length === 0;
}

console.log(isBlank(''));
console.log(isBlank('abc'));

// Exercise 2: Abbrev_name
function abbrevName(name) {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
        return `${parts[0]} ${parts[1][0]}.`;
    }
    return parts[0];
}

console.log(abbrevName("Robin Singh"));

// Exercise 3: SwapCase
function swapCase(str) {
    let swapped = "";
    for (let char of str) {
        if (char === char.toUpperCase()) {
            swapped += char.toLowerCase();
        } else {
            swapped += char.toUpperCase();
        }
    }
    return swapped;
}

console.log(swapCase('The Quick Brown Fox'));

// Exercise 4: Omnipresent value
function isOmnipresent(arr, val) {
    return arr.every(subArr => subArr.includes(val));
}

console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1));
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6));

// Exercise 5: Red table
let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = "red";
}
````

