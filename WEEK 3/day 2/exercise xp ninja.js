
// Exercise 1: Random Number
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Random Number: ${randomNumber}`);

for (let i = 0; i <= randomNumber; i += 2) {
    console.log(i);
}

// Exercise 2: Capitalized letters
function capitalize(str) {
    let evenCaps = "";
    let oddCaps = "";

    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            evenCaps += str[i].toUpperCase();
            oddCaps += str[i].toLowerCase();
        } else {
            evenCaps += str[i].toLowerCase();
            oddCaps += str[i].toUpperCase();
        }
    }

    return [evenCaps, oddCaps];
}

console.log(capitalize("abcdef"));

// Exercise 3: Is palindrome?
function isPalindrome(str) {
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversedStr = cleanedStr.split("").reverse().join("");
    return cleanedStr === reversedStr;
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("kayak"));
console.log(isPalindrome("hello"));

// Exercise 4: Biggest Number
function biggestNumberInArray(arrayNumber) {
    let max = 0;

    for (let item of arrayNumber) {
        if (typeof item === "number" && (max === 0 || item > max)) {
            max = item;
        }
    }

    return max;
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99]));
console.log(biggestNumberInArray(['a', 3, 4, 2]));
console.log(biggestNumberInArray([]));

// Exercise 5: Unique Elements
function getUniqueElements(arr) {
    return Array.from(new Set(arr));
}

console.log(getUniqueElements([1, 2, 3, 3, 3, 3, 4, 5]));

// Exercise 6: Calendar
function createCalendar(year, month) {
    const mon = month - 1;
    const d = new Date(year, mon);

    let table = document.createElement("table");
    
    let headerRow = "<tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr>";
    table.innerHTML = headerRow;

    let tr = document.createElement("tr");

    let dayOfWeek = d.getDay() - 1;
    if (dayOfWeek === -1) dayOfWeek = 6;

    for (let i = 0; i < dayOfWeek; i++) {
        tr.appendChild(document.createElement("td"));
    }

    while (d.getMonth() === mon) {
        let td = document.createElement("td");
        td.textContent = d.getDate();
        tr.appendChild(td);

        if (d.getDay() === 0) {
            table.appendChild(tr);
            tr = document.createElement("tr");
        }

        d.setDate(d.getDate() + 1);
    }

    if (d.getDay() !== 1) {
        while (tr.children.length < 7) {
            tr.appendChild(document.createElement("td"));
        }
        table.appendChild(tr);
    }

    document.body.appendChild(table);
}

createCalendar(2012, 9);
````
