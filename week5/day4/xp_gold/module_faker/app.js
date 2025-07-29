import { faker } from '@faker-js/faker';
const users = [];

function addFakeUser() {
    const user = {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        country: faker.location.country()
    };
    users.push(user);
    return user;
}

for (let i = 0; i < 3; i++) {
    addFakeUser();
}
console.log("Fake users:", users);

import promptSync from 'prompt-sync';
const prompt = promptSync();

function addUserFromPrompt() {
    const name = prompt('Enter your name: ');
    const address = prompt('Enter your address street: ');
    const country = prompt('Enter your country: ');
    const user = { name, address, country };
    users.push(user);
    return user;
}

addUserFromPrompt();
console.log("All users:", users);
