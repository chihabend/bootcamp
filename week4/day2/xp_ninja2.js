// EX1
const menu = [
    {
      type : "starter",
      name : "Houmous with Pita"
    },
    {
      type : "starter",
      name : "Vegetable Soup with Houmous peas"
    },
    {
      type : "dessert",
      name : "Chocolate Cake"
    }
  ]

menu.some(item => item.type === "dessert"); 
menu.every(item => item.type === "starter");
if (!menu.some(item => item.type === "main")) {
  menu.push({ type: "main", name: "Grilled Vegetables" });
}
const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];
menu.forEach(item => {
  const nameLower = item.name.toLowerCase();
  item.vegetarian = vegetarian.some(v => nameLower.includes(v));
});

// EX2

function string_chop(str, size) {
    return str.match(new RegExp(`.{1,${size}}`, 'g'));
  }

// EX3
function search_word(str, word) {
    const count = str.split(' ').filter(w => w === word).length;
    return `'${word}' was found ${count} times.`;
  }

// EX4
function reverseArray(arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
    }
    return arr;
  }

  
  