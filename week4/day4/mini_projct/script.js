const quotes = [{
  id: 0,
  author: "Albert Einstein",
  quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", 
  likes:0
},
{
  id: 1,
  author: "Oscar Wilde",
  quote: "Be yourself; everyone else is already taken.", 
  likes:0
},
{
  id: 2,
  author: "Charles Lindbergh",
  quote: "Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance.", 
  likes:0
},
{
  id: 3,
  author: "Maya Angelou",
  quote: "You will face many defeats in life, but never let yourself be defeated.", 
  likes:0
},
{
  id: 4,
  author: "Confucius",
  quote: "It does not matter how slowly you go as long as you do not stop.", 
  likes:0
}


]
function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.querySelector(".quote-text p").textContent = quote.quote;
  document.querySelector(".quote-author").textContent = quote.author;
}
function nombre_car_espace() {
    const quoteText = document.querySelector(".quote-text p").textContent;
    return alert(quoteText.length);
  }
function nombre_car_non() {
    const quoteText = document.querySelector(".quote-text p").textContent.replace(/\s/g, '');
    return alert(quoteText.length);
  }
function nombre_mot(){
  const quoteText = document.querySelector(".quote-text p").textContent.trim();
  if (quoteText === "") {
    alert(0);
    return;
  }
  const words = quoteText.split(/\s+/);
  alert(words.length);
}
function like(){
  const quoteText = document.querySelector(".quote-text p").textContent;
  const quoteObj = quotes.find(q => q.quote === quoteText);
  if (quoteObj) {
    quoteObj.likes += 1;
    const likeCountElem = document.querySelector(".like-count");
    if (likeCountElem) {
      likeCountElem.textContent = quoteObj.likes;
    }
  }
}