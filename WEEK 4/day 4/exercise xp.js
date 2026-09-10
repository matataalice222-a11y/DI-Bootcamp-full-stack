// Exercise 1: Comparison
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is less than or equal to 10`);
    } else {
      reject(new Error(`${num} is greater than 10`));
    }
  });
}

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error.message));

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error.message));

// Exercise 2: Delayed promise
const delayedPromise = new Promise(resolve => {
  setTimeout(() => {
    resolve('success');
  }, 4000);
});

delayedPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Exercise 3: Resolve and reject
const resolvedPromise = Promise.resolve(3);

resolvedPromise.then(value => console.log(value));

const rejectedPromise = Promise.reject(new Error('Boo!'));

rejectedPromise.catch(error => console.log(error.message));