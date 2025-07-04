// EX1
const people = ["Greg", "Mary", "Devon", "James"];
people.shift();
people[people.indexOf("James")] = "Jason";
people.push("TonNom");
console.log(people.indexOf("Mary"));
const copyPeople = people.slice(1, -1);
console.log(copyPeople);
console.log(people.indexOf("Foo"));
const last = people[people.length - 1];
console.log(last);

for (let person of people) {
  console.log(person);
}
for (let person of people) {
  console.log(person);
  if (person === "Devon") break;
}

// EX2
const colors = ["bleu", "rouge", "vert", "jaune", "violet"];
for (let i = 0; i < colors.length; i++) {
  console.log(`Mon choix n°${i + 1} est ${colors[i]}`);
}
for (let i = 0; i < colors.length; i++) {
  let suffix = (i === 0) ? "er" : "ème";
  console.log(`Mon ${i + 1}${suffix} choix est ${colors[i]}`);
}

// EX3
let number = prompt("Entrez un nombre");
while (Number(number) < 10 || isNaN(number)) {
  number = prompt("Entrez un nombre supérieur ou égal à 10");
}
console.log(number);

// EX4
const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};
console.log(building.numberOfFloors);
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);
let secondTenant = building.nameOfTenants[1];
console.log(secondTenant, building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0]);
let sarahRent = building.numberOfRoomsAndRent.sarah[1];
let davidRent = building.numberOfRoomsAndRent.david[1];
let danRent = building.numberOfRoomsAndRent.dan[1];
if (sarahRent + davidRent > danRent) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log(building.numberOfRoomsAndRent.dan[1]);

// EX5
const famille = {
  père: "Jean",
  mère: "Claire",
  enfant: "Emma"
};
for (let key in famille) {
  console.log(key);
}
for (let key in famille) {
  console.log(famille[key]);
}

// EX6
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
};
let sentence = '';
for (let key in details) {
  sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());

// EX7
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
const secretName = names.map(name => name[0]).sort().join('');
console.log(secretName);
