// Daily Challenge 1: Play with words
function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    const allStrings = words.every(word => typeof word === "string");

    if (allStrings) {
      resolve(words.map(word => word.toUpperCase()));
    } else {
      reject(new Error("Not all items in the array are strings."));
    }
  });
}

function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve([...words].sort());
    } else {
      reject(new Error("Array length must be greater than 4 to sort."));
    }
  });
}

makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.error(error.message));

makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.error(error.message));

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.error(error.message));

// Daily Challenge 2: Morse code
const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
  return new Promise((resolve, reject) => {
    const morseJS = JSON.parse(morse);
    
    if (Object.keys(morseJS).length === 0) {
      reject(new Error("The Morse object is empty."));
    } else {
      resolve(morseJS);
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or a sentence:");
    
    if (!userInput) {
      return reject(new Error("No input provided."));
    }

    const chars = userInput.toLowerCase().split("");
    const morseTranslation = [];

    for (const char of chars) {
      if (char === " ") {
        morseTranslation.push("/");
        continue;
      }
      
      if (morseJS[char]) {
        morseTranslation.push(morseJS[char]);
      } else {
        return reject(new Error(`The character "${char}" does not exist in the Morse object.`));
      }
    }

    resolve(morseTranslation);
  });
}

function joinWords(morseTranslation) {
  const joinedText = morseTranslation.join(" ");
  
  if (typeof document !== "undefined") {
    const output = document.createElement("div");
    output.textContent = joinedText;
    document.body.appendChild(output);
  }

  return joinedText;
}

if (typeof prompt === "function" && typeof document !== "undefined") {
  toJs()
    .then(morseJS => toMorse(morseJS))
    .then(morseTranslation => joinWords(morseTranslation))
    .catch(error => console.error(error.message));
}