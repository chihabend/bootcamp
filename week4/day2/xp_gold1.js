// EX1
// [2, 4, 6]

// EX2
// [1, 2, 0, 1, 2, 3]

// EX3
// de 0 a 5

// EX4
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const result1 = array.flat(2); 
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const result2 = greeting.map(el => el.join(" "));
const sentence = greeting.map(el => el.join(" ")).join(" ");
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const result = trapped.flat(Infinity);
