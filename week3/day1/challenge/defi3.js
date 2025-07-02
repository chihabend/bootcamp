const numbers = [5,0,9,1,7,4,2,6,3,8];

console.log('toString:', numbers.toString());


console.log('join(","):', numbers.join(","));
console.log('join("+"):', numbers.join("+"));
console.log('join(" "):', numbers.join(" "));
console.log('join(""):', numbers.join(""));


for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1 - i; j++) {
        if (numbers[j] < numbers[j + 1]) {
            let temp = numbers[j];
            numbers[j] = numbers[j + 1];
            numbers[j + 1] = temp;
        }
    }
    console.log(`After pass ${i+1}:`, numbers);
}

console.log('Sorted array (descending):', numbers);
