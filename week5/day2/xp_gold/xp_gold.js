//EX1  
 const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
 async function getRandomGif() {
   const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
   try {
     const response = await fetch(url);
     if (!response.ok) {
       throw new Error(`Erreur HTTP : ${response.status}`);
     }
     const data = await response.json();
     const gifUrl = data.data.images.original.url; 
     const img = document.createElement('img');
     img.src = gifUrl;
     img.alt = 'GIF Aléatoire de Giphy';
     document.getElementById('gif-container').appendChild(img);
   } catch (error) {
     console.error('❌ Erreur lors de la récupération du GIF :', error.message);
   }
 }
 getRandomGif();
 //EX2 
//  starting slow promise
// starting fast promise
// fast promise is done     / après 1 seconde
// fast
// slow promise is done     / après 2 secondes
// slow
 //EX3 
//  starting slow promise
// starting fast promise
// fast promise is done
// slow promise is done
// slow
// fast
//EX4 
const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    // "https://jsonplaceholder.typicode.com/albums"
  ];
  
  const getData = async function() {
    try {
      const responses = await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return await response.json();
        })
      );
      const [users, posts, albums] = responses;
      console.log('users', users);
      console.log('posts', posts);
      console.log('albums', albums);
  
    } catch (error) {
      console.log('oooooops', error.message);
    }
  };
  getData();
