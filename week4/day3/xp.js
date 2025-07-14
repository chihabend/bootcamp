// EX1

// I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)

// EX2
function displayStudentInfo({first, last}) {
    return `Your full name is ${first} ${last}`;
  }
  
  console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));

// EX3

const users = { user1: 18273, user2: 92833, user3: 90315 };
const usersArray = Object.entries(users);
const doubledUsersArray = usersArray.map(([user, id]) => [user, id * 2]);
console.log(usersArray);
console.log(doubledUsersArray);

// EX4
object

// EX5

// la deuxième

// EX6

// FALSE
// FALSE
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5 };

object1.number = 4;

console.log(object2.number); // 4
console.log(object3.number); // 4
console.log(object4.number); // 5

class Animal {
    constructor(name, type, color) {
      this.name = name;
      this.type = type;
      this.color = color;
    }
  }
  
  class Mammal extends Animal {
    sound(sound) {
      return `Moooo I'm a ${this.type}, named ${this.name} and I'm ${this.color}. Sound: ${sound}`;
    }
  }
  
  const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
  console.log(farmerCow.sound("meugle"));
  




