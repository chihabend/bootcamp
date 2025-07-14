// EX1
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
colors.forEach((color, index) => {
  console.log(`Le choix ${index + 1}# est ${color}.`);
});
if (colors.includes("Violet")) {
  console.log("Yeah");
} else {
  console.log("No...");
}

// EX2
const ordinal = ["th", "st", "nd", "rd"];
colors.forEach((color, index) => {
  const position = index + 1;
  let suffix = ordinal[0];
  if (position === 1) suffix = ordinal[1];
  else if (position === 2) suffix = ordinal[2];
  else if (position === 3) suffix = ordinal[3];
  console.log(`Le ${position}${suffix} choix est le ${color.toLowerCase()}.`);
});

// EX3

// ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']
// ['U', 'S', 'A']
// [undefined, undefined]

// EX4

const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' }
  ];
  
  const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
  console.log(welcomeStudents);
  
  const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
  console.log(fullStackResidents);
  
  const lastNames = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);
  console.log(lastNames);

// EX5

const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const epicSentence = epic.reduce((acc, word) => `${acc} ${word}`);
console.log(epicSentence);

// EX6

const students = [
    { name: "Ray", course: "Computer Science", isPassed: true },
    { name: "Liam", course: "Computer Science", isPassed: false },
    { name: "Jenner", course: "Information Technology", isPassed: true },
    { name: "Marco", course: "Robotics", isPassed: true },
    { name: "Kimberly", course: "Artificial Intelligence", isPassed: false },
    { name: "Jamie", course: "Big Data", isPassed: false }
  ];
  const passedStudents = students.filter(student => student.isPassed);
  console.log(passedStudents);
  passedStudents.forEach(student => {
    console.log(`Bon travail ${student.name}, tu as réussi le cours en ${student.course}.`);
  });
  







