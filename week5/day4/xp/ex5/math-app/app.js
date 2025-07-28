import { add, multiply } from './math.js';
import _ from 'lodash';
const numbers = [1, 2, 3, 4, 5];
const sum = _.sum([numbers[0], numbers[1]]);
const mult = _.reduce([numbers[2], numbers[3]], (acc, val) => acc * val, 1);
/////////////////////
console.log(add(numbers[0], numbers[1]));
console.log(multiply(numbers[2], numbers[3]));
console.log(sum);
console.log(mult);