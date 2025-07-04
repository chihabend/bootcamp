// ex1
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            console.log(i);
            sum += i;
        }
    }
    console.log("Sum:", sum);
}

displayNumbersDivisible();        
displayNumbersDivisible(3);      
displayNumbersDivisible(45);     

// ex2

const stock = { 
    banana: 6, 
    apple: 0,
    pear: 12,
    orange: 32,
    blueberry: 1
};

const prices = {    
    banana: 4, 
    apple: 2, 
    pear: 1,
    orange: 1.5,
    blueberry: 10
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
    let total = 0;
    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
            stock[item]--;
        }
    }
    return total;
}

console.log("Total Bill:", myBill());

// ex3

function changeEnough(itemPrice, amountOfChange) {
    const [quarters, dimes, nickels, pennies] = amountOfChange;
    const total = quarters * 0.25 + dimes * 0.10 + nickels * 0.05 + pennies * 0.01;
    return total >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [2, 100, 0, 0])); 
console.log(changeEnough(0.75, [0, 0, 20, 5])); 

// ex4

function hotelCost(nights) {
    return 140 * nights;
}

function planeRideCost(destination) {
    destination = destination.toLowerCase();
    if (destination === "london") return 183;
    if (destination === "paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95;
    return cost;
}

function totalVacationCost() {
    let nights, destination, days;

    while (isNaN(nights)) {
        nights = parseInt(prompt("How many nights in the hotel?"));
    }

    while (!destination || typeof destination !== "string") {
        destination = prompt("Where are you flying?");
    }

    while (isNaN(days)) {
        days = parseInt(prompt("How many days will you rent the car?"));
    }

    const hotel = hotelCost(nights);
    const flight = planeRideCost(destination);
    const car = rentalCarCost(days);

    console.log(`Hotel: $${hotel}, Plane: $${flight}, Car: $${car}`);
    console.log(`Total: $${hotel + flight + car}`);
}

totalVacationCost();

// ex5

const div = document.getElementById("container");
console.log(div);

const lists = document.querySelectorAll(".list");
lists[0].children[1].textContent = "Richard";

lists[1].children[1].remove();

lists.forEach(ul => {
    ul.firstElementChild.textContent = "YourName";
    ul.classList.add("student_list");
});

lists[0].classList.add("university", "attendance");

div.style.backgroundColor = "lightblue";
div.style.padding = "10px";

const lis = document.querySelectorAll("li");
lis.forEach(li => {
    if (li.textContent === "Dan") li.style.display = "none";
    if (li.textContent === "Richard") li.style.border = "1px solid black";
});

document.body.style.fontSize = "18px";

if (div.style.backgroundColor === "lightblue") {
    const names = lists[0].querySelectorAll("li");
    alert(`Hello ${names[0].textContent} and ${names[1].textContent}`);
}

// ex6

const nav = document.getElementById("navBar");
nav.setAttribute("id", "socialNetworkNavigation");

const ul = nav.querySelector("ul");
const newLi = document.createElement("li");
const text = document.createTextNode("Logout");
newLi.appendChild(text);
ul.appendChild(newLi);

console.log("First:", ul.firstElementChild.textContent);
console.log("Last:", ul.lastElementChild.textContent);

// ex7

const allBooks = [
    {
        title: "1984",
        author: "George Orwell",
        image: "https://example.com/1984.jpg",
        alreadyRead: true
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        image: "https://example.com/alchemist.jpg",
        alreadyRead: false
    }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
    const div = document.createElement("div");
    const text = document.createElement("p");
    text.textContent = `${book.title} written by ${book.author}`;
    if (book.alreadyRead) text.style.color = "red";

    const img = document.createElement("img");
    img.src = book.image;
    img.style.width = "100px";

    div.appendChild(text);
    div.appendChild(img);
    section.appendChild(div);
});
