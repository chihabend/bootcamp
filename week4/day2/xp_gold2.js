// EX1
const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, val) => acc + val, 0);
// EX2
const arr2 = [1, 2, 2, 3, 4, 4];
const unique = [...new Set(arr2)];

// EX3
const arr3 = [NaN, 0, 15, false, -22, '', undefined, 47, null];
const cleaned = arr3.filter(Boolean);

// EX4
function repeat(str, n = 1) {
    return str.repeat(n);
  }
  console.log(repeat('Ha!', 3));

// EX5

const startLine = '     ||<- Start line';
let turtle = '🐢';
let rabbit = '🐇';

console.log(startLine);
console.log(turtle.padStart(9));
console.log(rabbit.padStart(9));
 
// Supprime les espaces et ajoute des = jusqu’à  9 caracteres