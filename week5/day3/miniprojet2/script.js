// Global variables
let currentPokemonId = 1;
const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const MAX_POKEMON_ID = 1010; // Current max Pokemon in API

// DOM elements
const screen = document.getElementById('screen');
const randomBtn = document.getElementById('randomBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Event listeners
randomBtn.addEventListener('click', fetchRandomPokemon);
prevBtn.addEventListener('click', fetchPreviousPokemon);
nextBtn.addEventListener('click', fetchNextPokemon);

// Show loading state
function showLoading() {
    screen.classList.add('loading');
    screen.innerHTML = '<div class="loading-message">Loading Pokémon...</div>';
}

// Show error message
function showError(message) {
    screen.classList.remove('loading');
    screen.innerHTML = `<div class="error-message">${message}</div>`;
}

// Display Pokemon data
function displayPokemon(pokemon) {
    screen.classList.remove('loading');
    
    const pokemonTypes = pokemon.types.map(type => 
        `<span class="pokemon-type">${type.type.name}</span>`
    ).join('');

    screen.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
             alt="${pokemon.name}" 
             class="pokemon-image">
        <div class="pokemon-info">
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-details">
                <div>Pokémon n° ${pokemon.id}</div>
                <div>Height: ${pokemon.height / 10}m</div>
                <div>Weight: ${(pokemon.weight / 10).toFixed(1)}kg</div>
                <div style="margin-top: 8px;">
                    Type: ${pokemonTypes}
                </div>
            </div>
        </div>
    `;
    
    // Enable/disable navigation buttons
    updateNavigationButtons();
}

// Update navigation button states
function updateNavigationButtons() {
    prevBtn.disabled = currentPokemonId <= 1;
    nextBtn.disabled = currentPokemonId >= MAX_POKEMON_ID;
}

// Fetch Pokemon data by ID
async function fetchPokemonById(id) {
    try {
        showLoading();
        
        const response = await fetch(`${API_BASE_URL}${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const pokemon = await response.json();
        currentPokemonId = pokemon.id;
        displayPokemon(pokemon);
        
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        showError("Oh no! That Pokémon isn't available…");
    }
}

// Fetch random Pokemon
async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    await fetchPokemonById(randomId);
}

// Fetch previous Pokemon
async function fetchPreviousPokemon() {
    if (currentPokemonId > 1) {
        await fetchPokemonById(currentPokemonId - 1);
    }
}

// Fetch next Pokemon
async function fetchNextPokemon() {
    if (currentPokemonId < MAX_POKEMON_ID) {
        await fetchPokemonById(currentPokemonId + 1);
    }
}

// Initialize with a random Pokemon on page load
document.addEventListener('DOMContentLoaded', () => {
    // Start with navigation buttons disabled until first Pokemon is loaded
    prevBtn.disabled = true;
    nextBtn.disabled = true;
});
