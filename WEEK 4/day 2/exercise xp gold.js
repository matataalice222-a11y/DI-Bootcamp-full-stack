// Exercise 1: Print Full Name
function printFullName({ first, last }) {
  return `Your full name is ${first} ${last}`;
}

console.log(printFullName({ first: 'Elie', last: 'Schoppik' }));

// Exercise 2: Keys and Values
function keysAndValues(obj) {
  const keys = Object.keys(obj).sort();
  const values = keys.map((key) => obj[key]);

  return [keys, values];
}

console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
console.log(keysAndValues({ c: 'Google', a: 'Apple', b: 'Microsoft' }));

// Exercise 3: Counter class
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count += 1;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count); // 3
