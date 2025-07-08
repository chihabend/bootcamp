
    // #EX1

    function funcOne1() {
        let a1 = 5;
        if(a1 > 1) {
            a1 = 3;
        }
        alert(`inside the funcOne1 function ${a1}`);
    }
    funcOne1();

    let a2 = 0;
    function funcTwo2() {
        a2 = 5;
    }
    function funcThree2() {
        alert(`inside the funcThree2 function ${a2}`);
    }
    funcThree2(); 
    funcTwo2();
    funcThree2(); 

    function funcFour3() {
        window.a3 = "hello";
    }
    function funcFive3() {
        alert(`inside the funcFive3 function ${a3}`);
    }
    funcFour3();
    funcFive3(); 

    let a4 = 1;
    function funcSix4() {
        let a4 = "test";
        alert(`inside the funcSix4 function ${a4}`); 
    }
    funcSix4();

    let a5 = 2;
    if (true) {
        let a5block = 5;
        alert(`in the if block ${a5block}`); 
    }
    alert(`outside of the if block ${a5}`); 

    // #EX2
    const winBattle2 = () => true;
    const experiencePoints2 = winBattle2() ? 10 : 1;
    console.log("EX2 experiencePoints:", experiencePoints2);

    // #EX3
    const isString3 = value => typeof value === 'string';
    console.log("EX3 isString('hello'):", isString3('hello')); 
    console.log("EX3 isString([1,2,4,0]):", isString3([1, 2, 4, 0]));

    // #EX4
    const sum4 = (a, b) => a + b;
    console.log("EX4 sum(2,3):", sum4(2, 3));

    // #EX5
    function kgToGrams5(weight) {
        return weight * 1000;
    }
    console.log("EX5 kgToGrams5(2):", kgToGrams5(2));

    const kgToGrams5b = function(weight) {
        return weight * 1000;
    }
    console.log("EX5 kgToGrams5b(3):", kgToGrams5b(3));

    const kgToGrams5c = weight => weight * 1000;
    console.log("EX5 kgToGrams5c(1.5):", kgToGrams5c(1.5));

    // #EX6
    (function(children, partner, location, job) {
        const sentence = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
        const div = document.createElement("div");
        div.innerText = sentence;
        document.body.appendChild(div);
    })(3, "Alex", "Morocco", "developer");

    // #EX7
    (function(username) {
        const navbar = document.getElementById("navbar");
        const div = document.createElement("div");
        div.innerHTML = `<img src="https://via.placeholder.com/30" alt="profile" style="border-radius:50%"> ${username}`;
        navbar.appendChild(div);
    })("John");

    // #EX8 - Part I
    function makeJuice8Part1(size) {
        function addIngredients8(i1, i2, i3) {
            const sentence = `The client wants a ${size} juice, containing ${i1}, ${i2}, ${i3}.`;
            const div = document.createElement("div");
            div.innerText = sentence;
            document.body.appendChild(div);
        }
        addIngredients8("apple", "banana", "mango");
    }
    makeJuice8Part1("large");

    // #EX8 - Part II
    function makeJuice8Part2(size) {
        const ingredients = [];

        function addIngredients(i1, i2, i3) {
            ingredients.push(i1, i2, i3);
        }

        function displayJuice() {
            const sentence = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
            const div = document.createElement("div");
            div.innerText = sentence;
            document.body.appendChild(div);
        }

        addIngredients("apple", "banana", "mango");
        addIngredients("kiwi", "pineapple", "orange");
        displayJuice();
    }
    makeJuice8Part2("medium");
