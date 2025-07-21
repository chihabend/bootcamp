
const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const GIPHY_RANDOM_URL = 'https://api.giphy.com/v1/gifs/random';
const GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/search';
let gifContainer;
let searchForm;
let searchInput;
let deleteAllBtn;
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
});
function initializeElements() {
    gifContainer = document.getElementById('gifContainer');
    searchForm = document.getElementById('gifForm');
    searchInput = document.getElementById('searchInput');
    deleteAllBtn = document.getElementById('deleteAllBtn');
    updateDeleteAllButtonVisibility();
}
function setupEventListeners() {
    searchForm.addEventListener('submit', handleSearch);
    deleteAllBtn.addEventListener('click', deleteAllGifs);
}

async function handleSearch(event) {
    event.preventDefault();
    
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        showError('Veuillez entrer un terme de recherche');
        return;
    }
    try {
        showLoading();
        const gif = await fetchRandomGif(searchTerm);
        displayGif(gif);
        searchInput.value = '';
        updateDeleteAllButtonVisibility();
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        showError(`Erreur: ${error.message}`);
    } finally {
        hideLoading();
    }
}
async function fetchRandomGif(searchTerm) {
    try {
        return await tryRandomEndpoint(searchTerm);
    } catch (error) {
        console.log('Endpoint Random échoué, essai avec Search:', error.message);
        return await trySearchEndpoint(searchTerm);
    }
}

async function tryRandomEndpoint(searchTerm) {
    const url = `${GIPHY_RANDOM_URL}?api_key=${API_KEY}&tag=${encodeURIComponent(searchTerm)}`;
    
    console.log('Essai endpoint Random:', url);
    
    const response = await fetch(url);
    
    console.log('Statut de réponse Random:', response.status);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur API Random:', errorText);
        throw new Error(`Endpoint Random échoué (${response.status}): ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Données Random reçues:', data);
    
    if (!data.data) {
        throw new Error('Aucune donnée reçue de l\'endpoint Random');
    }
    
    if (!data.data.images) {
        throw new Error('Aucun GIF trouvé avec l\'endpoint Random');
    }
    
    return data.data;
}

async function trySearchEndpoint(searchTerm) {
    const url = `${GIPHY_SEARCH_URL}?api_key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=50&rating=g`;
    
    console.log('Essai endpoint Search:', url);
    
    try {
        const response = await fetch(url);
        
        console.log('Statut de réponse Search:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erreur API Search:', errorText);
            throw new Error(`API Giphy indisponible (${response.status}): ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Données Search reçues:', data);
        
        if (!data.data || data.data.length === 0) {
            throw new Error(`Aucun GIF trouvé pour "${searchTerm}"`);
        }
        
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const selectedGif = data.data[randomIndex];
        
        if (!selectedGif.images) {
            throw new Error('GIF sélectionné invalide');
        }
        
        return selectedGif;
        
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            throw new Error('Problème de connexion réseau. Vérifiez votre connexion internet.');
        }
        throw error;
    }
}

function displayGif(gifData) {
    const gifItem = createGifElement(gifData);
    gifContainer.appendChild(gifItem);
    
    setTimeout(() => {
        gifItem.style.opacity = '1';
        gifItem.style.transform = 'scale(1)';
    }, 10);
}

function createGifElement(gifData) {
    const gifItem = document.createElement('div');
    gifItem.className = 'gif-item';
    gifItem.style.opacity = '0';
    gifItem.style.transform = 'scale(0.8)';
    gifItem.style.transition = 'all 0.3s ease';
    
    const gifUrl = gifData.images.fixed_height?.url || 
                   gifData.images.original?.url || 
                   gifData.images.downsized?.url;
    
    const title = gifData.title || 'GIF sans titre';
    
    gifItem.innerHTML = `
        <img src="${gifUrl}" alt="${title}" loading="lazy">
        <button class="delete-btn" onclick="deleteGif(this)"> Supprimer</button>
    `;
    
    return gifItem;
}

function deleteGif(deleteButton) {
    const gifItem = deleteButton.parentElement;
    
    gifItem.style.opacity = '0';
    gifItem.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        if (gifItem.parentElement) {
            gifItem.parentElement.removeChild(gifItem);
            updateDeleteAllButtonVisibility();
        }
    }, 300);
}

function deleteAllGifs() {
    const allGifs = gifContainer.querySelectorAll('.gif-item');
    
    if (allGifs.length === 0) {
        return;
    }
    
    if (confirm('Êtes-vous sûr de vouloir supprimer tous les GIFs ?')) {
        allGifs.forEach((gif, index) => {
            setTimeout(() => {
                gif.style.opacity = '0';
                gif.style.transform = 'scale(0.8)';
            }, index * 50);
        });
        
        setTimeout(() => {
            gifContainer.innerHTML = '';
            updateDeleteAllButtonVisibility();
        }, allGifs.length * 50 + 300);
    }
}

function updateDeleteAllButtonVisibility() {
    const hasGifs = gifContainer.children.length > 0;
    deleteAllBtn.style.display = hasGifs ? 'block' : 'none';
}

function showLoading() {
    const existingLoading = document.querySelector('.loading');
    if (existingLoading) {
        existingLoading.remove();
    }
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Recherche en cours... ';
    
    gifContainer.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function showError(message, type = 'error') {
    const existingMessage = document.querySelector('.error, .success');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success' : 'error';
    messageDiv.textContent = message;
    
    gifContainer.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}
