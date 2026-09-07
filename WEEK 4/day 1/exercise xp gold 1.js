// Exercise 1: Analyzing the map method
const doubledNumbers = [1, 2, 3].map(number => {
  if (typeof number === 'number') return number * 2;
  return undefined;
});
console.log(doubledNumbers);

// Exercise 2: Analyzing the reduce method
const reducedArray = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2]
);
console.log(reducedArray);

// Exercise 3: The second map callback parameter is the index.
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((number, index) => {
    console.log(number, index);
    return number * 2;
});
console.log(newArray);

// Exercise 4: Nested arrays
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const modifiedArray = array.map((item, index) => (
  index < 3 ? item[0] : item.flat(Infinity)
));
console.log(modifiedArray);

const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const joinedGreeting = greeting.map(innerArr => innerArr.join(" "));
console.log(joinedGreeting);

const greetingString = joinedGreeting.join(" ");
console.log(greetingString);

const trapped = [[[[[[3]]]]]];
const rescued = trapped.flat(Infinity);
console.log(rescued);