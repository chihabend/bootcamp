// EX1 
const person1 = {
    fullName: "Alice Dupont",
    mass: 68, // en kg
    height: 1.65, // en m
    calcBMI: function () {
      return this.mass / (this.height ** 2);
    }
  };
  
  const person2 = {
    fullName: "Marc Lemoine",
    mass: 85,
    height: 1.75,
    calcBMI: function () {
      return this.mass / (this.height ** 2);
    }
  };
  
  function compareBMI(p1, p2) {
    const bmi1 = p1.calcBMI();
    const bmi2 = p2.calcBMI();
    if (bmi1 > bmi2) {
      console.log(`${p1.fullName} a un IMC plus élevé (${bmi1.toFixed(2)}) que ${p2.fullName} (${bmi2.toFixed(2)}).`);
    } else if (bmi2 > bmi1) {
      console.log(`${p2.fullName} a un IMC plus élevé (${bmi2.toFixed(2)}) que ${p1.fullName} (${bmi1.toFixed(2)}).`);
    } else {
      console.log(`${p1.fullName} et ${p2.fullName} ont le même IMC (${bmi1.toFixed(2)}).`);
    }
  }
  
  compareBMI(person1, person2);
  
  // EX2
  function calculateAverage(gradesList) {
    let sum = 0;
    for (let i = 0; i < gradesList.length; i++) {
      sum += gradesList[i];
    }
    return sum / gradesList.length;
  }
  
  function findAvg(gradesList) {
    const avg = calculateAverage(gradesList);
    console.log(`La moyenne est : ${avg.toFixed(2)}`);
  
    if (avg > 65) {
      console.log("Félicitations ! Vous avez réussi.");
    } else {
      console.log("Désolé, vous avez échoué. Vous devez recommencer le cours.");
    }
  }
  
  findAvg([80, 90, 75, 60, 85]); // 7alawa
  findAvg([50, 40, 55, 60]);     // la la
  