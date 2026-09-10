// Exercise 1: Promise.all()
const promise1 = Promise.resolve(3);
const promise2 = 42; // Promise.all handles non-promise values by treating them as resolved values
const promise3 = new Promise(resolve => {
  setTimeout(resolve, 3000, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then(result => console.log(result))
  .catch(error => console.error('An error occurred:', error));

/*
  How Promise.all works and why we receive this output:
  1. Promise.all() takes an iterable (like an array) of promises as input and returns a single Promise.
  2. It waits for all the input promises to resolve (or for any non-promise values to be evaluated). 
     - promise1 instantly resolves to 3.
     - promise2 is a regular number (42), which Promise.all automatically wraps as a resolved value.
     - promise3 takes 3 seconds (3000ms) to resolve to 'foo'.
  3. Once ALL promises in the array have successfully resolved, the main promise fulfills and returns 
     an array containing the resolved values in the exact same order they were passed.
  4. If any single promise rejects, Promise.all immediately fails and triggers the .catch() block 
     (fail-fast behavior), ignoring the rest. That is why we added a .catch() for error handling.
*/

// Exercise 2: Analyse Promise.all()
function timesTwoAsync(value) {
  return Promise.resolve(value * 2);
}

const numbers = [1, 2, 3];
const promises = numbers.map(timesTwoAsync);

Promise.all(promises)
  .then(result => console.log(result))
  .catch(error => console.error('An error occurred:', error));