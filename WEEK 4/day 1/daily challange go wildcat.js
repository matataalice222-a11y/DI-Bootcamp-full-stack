
```javascript
const gameInfo = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },
];

// 1. Create an array using forEach with an exclamation point at the end of every username
const usernames = [];
gameInfo.forEach(user => {
  usernames.push(user.username + "!");
});
console.log(usernames); // Output: ["john!", "becky!", "susy!", "tyson!"]


// 2. Create an array using forEach containing usernames of players with a score bigger than 5
const winners = [];
gameInfo.forEach(user => {
  if (user.score > 5) {
    winners.push(user.username);
  }
});
console.log(winners); // Output: ["becky", "susy"]


// 3. Find and display the total score of the users (using reduce, or a forEach/loop approach)
const totalScore = gameInfo.reduce((accumulator, current) => accumulator + current.score, 0);
console.log(totalScore); // Output: 71

```