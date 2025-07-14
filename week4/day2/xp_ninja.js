// EX1
const data = [
    {
      name: 'Butters',
      age: 3,
      type: 'dog'
    },
     {
      name: 'Cuty',
      age: 5,
      type: 'rabbit'
    },
    {
      name: 'Lizzy',
      age: 6,
      type: 'dog'
    },
    {
      name: 'Red',
      age: 1,
      type: 'cat'
    },
    {
      name: 'Joey',
      age: 3,
      type: 'dog'
    },
    {
      name: 'Rex',
      age: 10,
      type: 'dog'
    },
  ];

let sum = 0;
for (const animal of data) {
  if (animal.type === 'dog') sum += animal.age * 7;
}

const total = data.reduce((acc, curr) => {
  return curr.type === 'dog' ? acc + curr.age * 7 : acc;
}, 0); 

// EX2
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com '
const cleanEmail = userEmail3.trim();

// EX3
const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];
const userObj = {};
users.forEach(u => userObj[`${u.firstName} ${u.lastName}`] = u.role);

// EX4
const letters = ['x', 'y', 'z', 'z'];
const counts = {};
for (let l of letters) {
  counts[l] = (counts[l] || 0) + 1;
}
const countObj = letters.reduce((acc, l) => {
  acc[l] = (acc[l] || 0) + 1;
  return acc;
}, {});



