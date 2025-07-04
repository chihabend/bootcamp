// EX1
function isBlank(str) {
    return str.trim() === '';
  }
  console.log(isBlank(''));         
        console.log(isBlank('abc'));            
// EX2
  function abbrevName(name) {
    const parts = name.split(' ');
    return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
  }
  console.log(abbrevName("Robin Singh")); 
  
  
// EX3
  function swapCase(str) {
    return str
      .split('')
      .map(char => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        } else {
          return char.toUpperCase();
        }
      })
      .join('');
  }
  console.log(swapCase('The Quick Brown Fox')); 
  
  
// EX4
  function isOmnipresent(arr, value) {
    return arr.every(subArr => subArr.includes(value));
  }
  console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); 
  console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); 
  
  
// EX5
  const table = document.querySelector('table');
  
  for (let i = 0; i < table.rows.length; i++) {
    const cell = table.rows[i].cells[i];
    if (cell) {
      cell.style.backgroundColor = 'red';
    }
  }
  