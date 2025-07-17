//EX1
function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
      if (words.every(word => typeof word === "string")) {
        resolve(words.map(word => word.toUpperCase()));
      } else {
        reject("Tous les éléments doivent être des chaînes de caractères.");
      }
    });
  }
  

  function sortWords(words) {
    return new Promise((resolve, reject) => {
      if (words.length > 4) {
        resolve(words.sort());
      } else {
        reject("Le tableau doit contenir plus de 4 mots pour être trié.");
      }
    });
  }
  
  
  makeAllCaps([1, "pear", "banana"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log("Erreur:", error));
  

  makeAllCaps(["apple", "pear", "banana"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result))
    .catch(error => console.log("Erreur:", error));
  

  makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
    .then(arr => sortWords(arr))
    .then(result => console.log(result)) 
    .catch(error => console.log("Erreur:", error));
  
//EX2
const prompt = require('prompt-sync')();

const morse = `{
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
  }`
function toJs() {
  return new Promise((resolve, reject) => {
    const morseJs = JSON.parse(morse);
    if (Object.keys(morseJs).length === 0) {
      reject("L'objet Morse est vide.");
    } else {
      resolve(morseJs);
    }
  });
}
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Entrez un mot ou une phrase : ").toLowerCase();
    const translated = [];

    for (const char of userInput) {
      if (morseJS[char]) {
        translated.push(morseJS[char]);
      } else {
        reject(`Caractère non reconnu : "${char}"`);
        return;
      }
    }

    resolve(translated);
  });
}
function joinWords(morseTranslation) {
  const output = morseTranslation.join('\n');
  console.log('\nMorse Code Translation:');
  console.log(output);
}
toJs()
  .then(result => toMorse(result))
  .then(result => joinWords(result))
  .catch(error => console.error("Erreur :", error));


  