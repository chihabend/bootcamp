
let characterInfo, characterName, characterHeight, characterGender, characterBirthYear, characterHomeworld;
let loadingMessage, errorMessage, findButton;

function getDOMElements() {
    characterInfo = document.getElementById('characterInfo');
    characterName = document.getElementById('characterName');
    characterHeight = document.getElementById('characterHeight');
    characterGender = document.getElementById('characterGender');
    characterBirthYear = document.getElementById('characterBirthYear');
    characterHomeworld = document.getElementById('characterHomeworld');
    loadingMessage = document.getElementById('loadingMessage');
    errorMessage = document.getElementById('errorMessage');
    findButton = document.getElementById('findButton');
}

function getRandomCharacterId() {
    return Math.floor(Math.random() * 83) + 1;
}

function showLoading() {
    characterInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingMessage.classList.remove('hidden');
    findButton.disabled = true;
}

function hideLoading() {
    loadingMessage.classList.add('hidden');
    findButton.disabled = false;
}

function showCharacterInfo(character, homeworld) {
    hideLoading();
    
    characterName.textContent = character.name;
    characterHeight.textContent = character.height;
    characterGender.textContent = character.gender;
    characterBirthYear.textContent = character.birth_year;
    characterHomeworld.textContent = homeworld;
    
    errorMessage.classList.add('hidden');
    characterInfo.classList.remove('hidden');
}

function showError() {
    hideLoading();
    characterInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

async function fetchHomeworld(homeworldUrl) {
    try {
        const response = await fetch(homeworldUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch homeworld');
        }
        const data = await response.json();
        return data.result.properties.name;
    } catch (error) {
        console.error('Error fetching homeworld:', error);
        return 'Unknown';
    }
}

async function fetchCharacterData(characterId) {
    try {
        const response = await fetch(`https://www.swapi.tech/api/people/${characterId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.result) {
            throw new Error('Character not found');
        }
        
        const character = data.result.properties;
        
        let homeworldName = 'Unknown';
        if (character.homeworld) {
            homeworldName = await fetchHomeworld(character.homeworld);
        }
        
        return {
            character: character,
            homeworld: homeworldName
        };
        
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
}

async function findCharacter() {
    showLoading();
    
    const characterId = getRandomCharacterId();
    
    try {
        const { character, homeworld } = await fetchCharacterData(characterId);

        setTimeout(() => {
            showCharacterInfo(character, homeworld);
        }, 500);
        
    } catch (error) {
        setTimeout(() => {
            showError();
        }, 500);
    }
}

function setupEventListeners() {
    findButton.addEventListener('click', findCharacter);
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !findButton.disabled) {
            findCharacter();
        }
    });
}

function init() {
    getDOMElements();
    setupEventListeners();
    
    findCharacter();
}

document.addEventListener('DOMContentLoaded', init);
