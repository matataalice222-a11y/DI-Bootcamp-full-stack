
// Exercise 1: Find the numbers divisible by 23
function displayNumbersDivisible(divisor = 23) {
    let numbers = [];
    let sum = 0;

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            numbers.push(i);
            sum += i;
        }
    }

    console.log(numbers.join(" "));
    console.log(`Sum : ${sum}`);
}

displayNumbersDivisible();
displayNumbersDivisible(3);
displayNumbersDivisible(45);

// Exercise 2: Shopping List
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
};

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;

    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
            stock[item]--;
        }
    }

    return total;
}

console.log(`Total Bill: $${myBill()}`);

// Exercise 3: What's in my wallet?
function changeEnough(itemPrice, amountOfChange) {
    const coinValues = [0.25, 0.10, 0.05, 0.01];
    let totalWallet = 0;

    for (let i = 0; i < amountOfChange.length; i++) {
        totalWallet += amountOfChange[i] * coinValues[i];
    }

    return totalWallet >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [2, 100, 0, 0]));
console.log(changeEnough(0.75, [0, 0, 20, 5]));

// Exercise 4: Vacation Costs
function hotelCost(nights) {
    while (isNaN(nights) || nights <= 0 || nights === null) {
        nights = Number(prompt("How many nights would you like to stay in the hotel?"));
    }
    return nights * 140;
}

function planeRideCost(destination) {
    while (!destination || typeof destination !== "string" || !isNaN(destination)) {
        destination = prompt("What is your destination?");
    }

    destination = destination.trim().toLowerCase();
    if (destination === "london") return 183;
    if (destination === "paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    while (isNaN(days) || days <= 0 || days === null) {
        days = Number(prompt("How many days would you like to rent the car?"));
    }

    let cost = days * 40;
    if (days > 10) {
        cost *= 0.95;
    }
    return cost;
}

function totalVacationCost() {
    const nights = Number(prompt("How many nights at the hotel?"));
    const destination = prompt("Where are you flying to?");
    const carDays = Number(prompt("How many days for car rental?"));

    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(carDays);

    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    return hotel + plane + car;
}

totalVacationCost();

// Exercise 5: Users
const container = document.getElementById("container");
console.log(container);

const lists = document.querySelectorAll(".list");
lists[0].children[1].textContent = "Richard";

lists[1].children[1].remove();

lists.forEach(ul => {
    ul.children[0].textContent = "YourName";
});

lists.forEach(ul => ul.classList.add("student_list"));
lists[0].classList.add("university", "attendance");

container.style.backgroundColor = "lightblue";
container.style.padding = "10px";

const danLi = Array.from(document.querySelectorAll("li")).find(li => li.textContent === "Dan");
if (danLi) danLi.style.display = "none";

const richardLi = Array.from(document.querySelectorAll("li")).find(li => li.textContent === "Richard");
if (richardLi) richardLi.style.border = "1px solid black";

document.body.style.fontSize = "18px";

if (container.style.backgroundColor === "lightblue") {
    const users = Array.from(lists[0].children).map(li => li.textContent);
    alert(`Hello ${users.join(" and ")}`);
}

// Exercise 6: Change the navbar
const navBar = document.getElementById("navBar");
navBar.setAttribute("id", "socialNetworkNavigation");

const ul = navBar.querySelector("ul");
const newLi = document.createElement("li");
const newText = document.createTextNode("Logout");

newLi.appendChild(newText);
ul.appendChild(newLi);

const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;

console.log("First element text:", firstLi.textContent);
console.log("Last element text:", lastLi.textContent);

// Exercise 7: My Book List
const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://m.media-amazon.com/images/I/710+lcoCA3L._AC_UF1000,1000_QL80_.jpg",
        alreadyRead: true
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        image: "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg",
        alreadyRead: false
    }
];

const listSection = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    
    const bookDetails = document.createElement("p");
    bookDetails.textContent = `${book.title} written by ${book.author}`;
    
    if (book.alreadyRead) {
        bookDetails.style.color = "red";
    }

    const bookImage = document.createElement("img");
    bookImage.src = book.image;
    bookImage.style.width = "100px";

    bookDiv.appendChild(bookDetails);
    bookDiv.appendChild(bookImage);
    listSection.appendChild(bookDiv);
});
````

