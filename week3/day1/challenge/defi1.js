
let sentence = "Le film n'est pas si mauvais, je l'aime bien";
let wordNot = sentence.indexOf("pas");
let wordBad = sentence.indexOf("mauvais");
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
  let result = sentence.slice(0, wordNot) + "bon" + sentence.slice(wordBad + "mauvais".length);
  console.log(result);
} else {
  console.log(sentence);
}
