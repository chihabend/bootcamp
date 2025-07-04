let input = prompt("Enter several words separated by commas:");
let words = input.split(',').map(word => word.trim());
let maxLength = Math.max(...words.map(word => word.length));
let border = '*'.repeat(maxLength + 4); 
console.log(border);

for (let word of words) {
  let line = `* ${word}${' '.repeat(maxLength - word.length)} *`;
  console.log(line);
}

console.log(border);
