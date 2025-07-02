// EX1 
let numbers = [123, 8409, 100053, 333333333, 7];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i] % 3 === 0);
}
// EX2 
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
};

let studentName = prompt("Quel est votre prénom ?").toLowerCase();
if (studentName in guestList) {
  console.log(`Hi! I'm ${studentName}, and I'm from ${guestList[studentName]}.`);
} else {
  console.log("Hi! I'm a guest.");
}

// EX3 
let age = [20, 5, 12, 43, 98, 55];

let total = 0;
for (let i = 0; i < age.length; i++) {
  total += age[i];
}
console.log("Somme des âges :", total);

// Âge le plus élevé
let maxAge = age[0];
for (let i = 1; i < age.length; i++) {
  if (age[i] > maxAge) {
    maxAge = age[i];
  }
}
console.log("Âge le plus élevé :", maxAge);
