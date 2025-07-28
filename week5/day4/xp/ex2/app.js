import {people} from './data.js';
function moyenage() {
    const moyenage = people.reduce((acc, person) => acc + person.age, 0) / people.length;
    console.log("l'age moyen est : " + moyenage);
}
moyenage();

