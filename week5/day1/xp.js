// EX1
function compareToTen(num) {
    return new Promise((resolve, reject) => {
      if (num <= 10) {
        resolve(`${num} is less than or equal to 10`);
      } else {
        reject(`${num} is greater than 10`);
      }
    });
  }
  
  compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error));
  
  compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));
// EX2
const successPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 4000);
  });
  successPromise.then(result => console.log(result));
// EX3
const resolvedPromise = Promise.resolve(3);
resolvedPromise.then(value => console.log(value));
const rejectedPromise = Promise.reject("Boo!");
rejectedPromise.catch(error => console.log(error));

  
