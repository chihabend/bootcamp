let client = "John";

const groceries = {
  fruits: ["pear", "apple", "banana"],
  vegetables: ["tomatoes", "cucumber", "salad"],
  totalPrice: "20$",
  other: {
    paid: true,
    meansOfPayment: ["cash", "creditCard"]
  }
}


const displayGroceries = () => {
  groceries.fruits.forEach(fruit => console.log(fruit));
}

const cloneGroceries = () => {
  let user = client;

  client = "Betty";

  console.log("user après modification client :", user);

  let shopping = groceries;

  shopping.totalPrice = "35$";

  console.log("groceries.totalPrice après modification shopping :", groceries.totalPrice);

  shopping.other.paid = false;

  console.log("groceries.other.paid après modification shopping :", groceries.other.paid);

  console.log("shopping objet après modifications :", shopping);
  console.log("groceries objet après modifications :", groceries);
}
displayGroceries();
cloneGroceries();
