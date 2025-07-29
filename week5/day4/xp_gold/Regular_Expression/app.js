import extractNumbers from './regular_expression.js';

const text = "k5k3q2g5z6x9bn";
const numbers = extractNumbers(text);
const result = Number(numbers.join(''));

console.log(result);

