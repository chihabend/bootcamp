// EX1
const randomNum = Math.floor(Math.random() * 100) + 1;
console.log("Random number:", randomNum);
for (let i = 0; i <= randomNum; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// EX2
function capitalize(str) {
  let even = '';
  let odd = '';
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      even += str[i].toUpperCase();
      odd += str[i];
    } else {
      even += str[i];
      odd += str[i].toUpperCase();
    }
  }
  return [even, odd];
}
console.log(capitalize("abcdef")); 

// EX3
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}
console.log(isPalindrome("madam")); 
console.log(isPalindrome("hello")); 

// EX4
function biggestNumberInArray(arr) {
  const numbers = arr.filter(val => typeof val === "number");
  if (numbers.length === 0) return 0;
  return Math.max(...numbers);
}
console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99])); 
console.log(biggestNumberInArray(['a', 3, 4, 2])); 
console.log(biggestNumberInArray([])); 

// EX5
function uniqueArray(arr) {
  return [...new Set(arr)];
}
console.log(uniqueArray([1,2,3,3,3,3,4,5])); 

// EX6
function createCalendar(year, month) {
  let mon = month - 1;
  let date = new Date(year, mon, 1);

  const table = document.createElement('table');
  const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  let thead = table.createTHead();
  let headRow = thead.insertRow();
  weekdays.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headRow.appendChild(th);
  });

  let tbody = table.createTBody();
  let row = tbody.insertRow();

  let firstDay = (date.getDay() + 6) % 7;
  for (let i = 0; i < firstDay; i++) {
    row.insertCell();
  }

  while (date.getMonth() === mon) {
    let cell = row.insertCell();
    cell.textContent = date.getDate();
    if ((date.getDay() + 6) % 7 === 6) {
      row = tbody.insertRow();
    }
    date.setDate(date.getDate() + 1);
  }

  document.body.appendChild(table);
}

createCalendar(2012, 9); 
