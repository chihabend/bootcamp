//EX1
const API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const deleteButton = document.getElementById('deleteButton');
const gifsContainer = document.getElementById('gifsContainer');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');
const noResults = document.getElementById('noResults');

let currentGifs = [];
searchForm.addEventListener('submit', handleSearch);
deleteButton.addEventListener('click', deleteAllGifs);

async function handleSearch(event) {
    event.preventDefault();
    
    const query = searchInput.value.trim();
    if (!query) {
        showError('Veuillez entrer une catégorie de recherche');
        return;
    }

    hideAllMessages();
    showLoading(true);
    setButtonsDisabled(true);
    
    try {
        const gifs = await fetchGifs(query);
        displayGifs(gifs);
        
        if (gifs.length === 0) {
            showNoResults();
        }
        
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        showError('Erreur lors de la recherche des GIFs. Veuillez réessayer.');
    } finally {
        showLoading(false);
        setButtonsDisabled(false);
    }
}

async function fetchGifs(query) {
    const url = `${GIPHY_API_URL}?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=20&offset=0&rating=g&lang=fr`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Clé API invalide');
        } else if (response.status === 403) {
            throw new Error('Accès interdit à l\'API');
        } else if (response.status === 429) {
            throw new Error('Limite de requêtes dépassée');
        } else if (response.status >= 500) {
            throw new Error('Erreur serveur Giphy');
        } else {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    }
    
    const data = await response.json();
    
    if (!data || !data.data) {
        throw new Error('Structure de réponse invalide');
    }
    
    return data.data;
}

function displayGifs(gifs) {
    currentGifs = gifs;
    gifsContainer.innerHTML = '';
    
    gifs.forEach((gif, index) => {
        const gifElement = createGifElement(gif, index);
        gifsContainer.appendChild(gifElement);
    });
}

function createGifElement(gif, index) {
    const gifDiv = document.createElement('div');
    gifDiv.className = 'gif-item';
    gifDiv.setAttribute('data-index', index);
    
    const imageUrl = gif.images?.fixed_height?.url || gif.images?.original?.url;
    const title = gif.title || 'GIF sans titre';
    
    if (!imageUrl) {
        console.warn('URL d\'image manquante pour le GIF:', gif);
        return gifDiv;
    }
    
    gifDiv.innerHTML = `
        <img src="${imageUrl}" alt="${title}" loading="lazy">
        <div class="gif-title">${title}</div>
    `;
    
    gifDiv.style.opacity = '0';
    gifDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        gifDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        gifDiv.style.opacity = '1';
        gifDiv.style.transform = 'translateY(0)';
    }, index * 100);
    
    return gifDiv;
}

function deleteAllGifs() {
    if (currentGifs.length === 0) {
        showError('Aucun GIF à supprimer');
        return;
    }
    
    const gifItems = document.querySelectorAll('.gif-item');
    gifItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px) scale(0.9)';
        }, index * 50);
    });
    
    setTimeout(() => {
        gifsContainer.innerHTML = '';
        currentGifs = [];
        searchInput.value = '';
        hideAllMessages();
    }, gifItems.length * 50 + 300);
}

function showError(message) {
    hideAllMessages();
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showLoading(show) {
    loadingMessage.style.display = show ? 'block' : 'none';
}

function showNoResults() {
    noResults.style.display = 'block';
}

function hideAllMessages() {
    errorMessage.style.display = 'none';
    loadingMessage.style.display = 'none';
    noResults.style.display = 'none';
}

function setButtonsDisabled(disabled) {
    searchButton.disabled = disabled;
    deleteButton.disabled = disabled;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Application Giphy initialisée');
    
    searchInput.focus();
    
    window.addEventListener('error', function(event) {
        console.error('Erreur globale:', event.error);
        showError('Une erreur inattendue s\'est produite');
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Promesse rejetée:', event.reason);
        showError('Erreur de connexion');
        event.preventDefault();
    });
});

function isValidImageUrl(url) {
    try {
        new URL(url);
        return url.match(/\.(gif|jpeg|jpg|png|webp)$/i) !== null;
    } catch {
        return false;
    }
}

function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
//EX2
// apres 1 sec
// starting slow promise
// starting fast promise
// fast promise is done
// slow promise is done
// slow
// fast
//EX3
// après 5 sec
// starting slow promise
// starting fast promise
// fast promise is done
// fast
// slow promise is done
// slow
//EX4
// après 13 sec
// starting slow promise
// starting fast promise
// fast promise is done
// fast
// slow promise is done
// slow