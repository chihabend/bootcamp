//EX1
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); 
  })
  .catch(error => {
    console.error("One of the promises failed:", error);
  });
//résultat final : [3, 42, "foo"].

//EX2
//[2, 4, 6]


