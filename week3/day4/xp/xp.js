// EX 1
const h1 = document.querySelector('h1');
console.log(h1);
const article = document.querySelector('article');
article.lastElementChild.remove();
const h2 = document.querySelector('h2');
h2.addEventListener('click', () => {
  h2.style.backgroundColor = 'red';
});
const h3 = document.querySelector('h3');
h3.addEventListener('click', () => {
  h3.style.display = 'none';
});
document.getElementById('boldBtn').addEventListener('click', () => {
  document.querySelectorAll('article p').forEach(p => {
    p.style.fontWeight = 'bold';
  });
});
h1.addEventListener('mouseover', () => {
  const size = Math.floor(Math.random() * 101);
  h1.style.fontSize = `${size}px`;
});
const secondPara = document.querySelectorAll('article p')[1];
secondPara.style.transition = 'opacity 1s';
secondPara.addEventListener('mouseover', () => {
  secondPara.style.opacity = 0;
});
secondPara.addEventListener('mouseout', () => {
  secondPara.style.opacity = 1;
});
// EX 2
const form = document.querySelector('form');
console.log(form);

const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
console.log(fnameInput, lnameInput);

const nameInputs = document.getElementsByName('firstname');
console.log(nameInputs);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fname = fnameInput.value.trim();
  const lname = lnameInput.value.trim();

  if (fname && lname) {
    const ul = document.querySelector('.usersAnswer');
    ul.innerHTML = '';

    [fname, lname].forEach(value => {
      const li = document.createElement('li');
      li.textContent = value;
      ul.appendChild(li);
    });
  }
});

// EX 3
let allBoldItems;

function getBoldItems() {
  allBoldItems = document.querySelectorAll('#highlight-paragraph strong');
}

function highlight() {
  allBoldItems.forEach(item => item.style.color = 'blue');
}

function returnItemsToDefault() {
  allBoldItems.forEach(item => item.style.color = 'black');
}

getBoldItems();
const paragraph = document.getElementById('highlight-paragraph');
paragraph.addEventListener('mouseover', highlight);
paragraph.addEventListener('mouseout', returnItemsToDefault);

// EX 4
document.getElementById('MyForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const radius = parseFloat(document.getElementById('radius').value);
  if (isNaN(radius)) {
    alert("Please enter a valid number.");
    return;
  }
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  document.getElementById('volume').value = volume.toFixed(2);
});





