// Exercise 1: Menu
const menu = [
  { type: "starter", name: "Houmous with Pita" },
  { type: "starter", name: "Vegetable Soup with Houmous peas" },
  { type: "dessert", name: "Chocolate Cake" }
];

const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];

const hasDessert = menu.some(item => item.type === "dessert");
console.log(hasDessert ? "Yes, at least one item is a dessert." : "No dessert found.");

const allStarters = menu.every(item => item.type === "starter");
console.log("Are all elements starters?", allStarters);

const hasMain = menu.some(item => item.type === "main course");
if (!hasMain) {
  menu.push({ type: "main course", name: "Grilled Salmon" });
}

menu.forEach(item => {
  const lowerName = item.name.toLowerCase();
  item.vegetarian = vegetarian.some(ingredient => lowerName.includes(ingredient));
});

console.log(menu);

// Exercise 2: Chop into chunks
function string_chop(string, size) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError("size must be a positive integer");
  }

  const chunks = [];
  for (let index = 0; index < string.length; index += size) {
    chunks.push(string.slice(index, index + size));
  }
  return chunks;
}

console.log(string_chop("developers", 2));

// Exercise 3: Search for a complete word
function search_word(string, word) {
  const words = string.toLowerCase().match(/[a-z0-9']+/g) || [];
  const count = words.filter(item => item === word.toLowerCase()).length;
  return `'${word}' was found ${count} times.`;
}

function search_word_regex(string, word) {
  const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escapedWord}\\b`, "gi");
  const matches = string.match(regex);
  const count = matches ? matches.length : 0;
  return `'${word}' was found ${count} times.`;
}

console.log(search_word("The quick brown fox, fox!", "fox"));
console.log(search_word_regex("The quick brown fox, fox!", "fox"));

// Exercise 4: Reverse an array in place
function reverseArray(array) {
  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex < rightIndex) {
    [array[leftIndex], array[rightIndex]] = [array[rightIndex], array[leftIndex]];
    leftIndex += 1;
    rightIndex -= 1;
  }

  return array;
}

console.log(reverseArray([1, 2, 3, 4, 5]));
console.log(reverseArray([1, 2]));
console.log(reverseArray([]));
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));