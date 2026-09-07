// Exercise 1: Dog age to human years
const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' }
];

let totalHumanYearsLoop = 0;
for (let index = 0; index < data.length; index++) {
  if (data[index].type === 'dog') {
    totalHumanYearsLoop += data[index].age * 7;
  }
}
console.log(totalHumanYearsLoop);

const totalHumanYearsReduce = data.reduce((total, animal) => {
  return animal.type === 'dog' ? total + animal.age * 7 : total;
}, 0);
console.log(totalHumanYearsReduce);

// Exercise 2: Email
const userEmail3 = '     cannotfillemailformcorrectly@gmail.com   ';
const cleanEmail = userEmail3.trim();
console.log(cleanEmail);

// Exercise 3: Employees
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' }
];

const transformedUsers = {};
users.forEach(user => {
  const fullName = `${user.firstName} ${user.lastName}`;
  transformedUsers[fullName] = user.role;
});
console.log(transformedUsers);

// Exercise 4: Array to object
const letters = ['x', 'y', 'z', 'z'];

const countForLoop = {};
for (let index = 0; index < letters.length; index++) {
  const letter = letters[index];
  if (countForLoop[letter]) {
    countForLoop[letter] += 1;
  } else {
    countForLoop[letter] = 1;
  }
}
console.log(countForLoop);

const countReduce = letters.reduce((counts, letter) => {
  counts[letter] = (counts[letter] || 0) + 1;
  return counts;
}, {});
console.log(countReduce);