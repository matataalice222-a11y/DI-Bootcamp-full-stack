
// Exercise 1: List of people
const people = ["Greg", "Mary", "Devon", "James"];

people.shift(); // Removes "Greg"
people[people.indexOf("James")] = "Jason"; // Replaces "James" with "Jason"
people.push("YourName"); // Adds your name to the end
console.log(people.indexOf("Mary")); // Returns 0

const peopleCopy = people.slice(1, 3); // ["Devon", "Jason"]
console.log(people.indexOf("Foo")); // Returns -1

const last = people[people.length - 1];

// Iterate through people
for (let person of people) {
    console.log(person);
}

// Iterate and exit after "Devon"
for (let person of people) {
    console.log(person);
    if (person === "Devon") {
        break;
    }
}

// Exercise 2: Your favorite colors
const colors = ["blue", "red", "green", "purple", "black"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My #${i + 1} choice is ${colors[i]}`);
}

const suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

// Exercise 3: Repeat the question
let num;
do {
    num = Number(prompt("Please enter a number:"));
} while (num < 10);

// Exercise 4: Building Management
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

console.log(building.numberOfFloors);
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);

const secondTenant = building.nameOfTenants[1];
const rooms = building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];
console.log(`${secondTenant} has ${rooms} rooms.`);

const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];

if (sarahRent + davidRent > building.numberOfRoomsAndRent.dan[1]) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}

// Exercise 5: Family
const family = {
    father: "John",
    mother: "Jane",
    son: "Mark"
};

for (let key in family) {
    console.log(key);
}

for (let key in family) {
    console.log(family[key]);
}

// Exercise 6: Rudolf
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};

let sentence = "";
for (let key in details) {
    sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());

// Exercise 7: Secret Group
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const secretSociety = names
    .map(name => name[0])
    .sort()
    .join("");

console.log(secretSociety); // Outputs: "ABJKPS"
````


