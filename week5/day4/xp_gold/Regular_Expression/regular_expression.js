function extractNumbers(text) {
    const matches = text.match(/\d+/g);
    return matches ? matches.map(Number) : [];
    
}
export default extractNumbers;

import promptSync from 'prompt-sync';
const prompt = promptSync();

function isValidFullName(name) {

    return /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name);
}

const userFullName = prompt('Enter your full name (e.g., "John Doe"): ');

if (isValidFullName(userFullName)) {
    console.log("Valid full name!");
} else {
    console.log("Invalid full name. Please enter a name with only letters, exactly one space, and each name starting with an uppercase letter.");
}
