//EX1 
fetch('https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My', {
    method: 'GET',
    headers: {
      'Authorization': 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erreur :', error));
//EX2 
const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const query = 'soleil';
const limit = 10;
const offset = 2;
const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}`;
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('TT VA BIEN');
    console.log(data); 
  })
  .catch(error => {
    console.error('PROBLEMEA 3CHIRI', error);
  });
//EX3 
async function fetchStarshipData() {
    const url = "https://www.swapi.tech/api/starships/9/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.result);
  
    } catch (error) {
      console.error("❌ Une erreur est survenue :", error.message);
    }
  }
  fetchStarshipData();
//EX4 
// calling
// attente de 2 secondes
// resolved
