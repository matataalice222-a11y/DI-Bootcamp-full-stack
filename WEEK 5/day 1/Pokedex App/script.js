// DOM Elements
const imgEl = document.getElementById('pokemon-image');
const nameEl = document.getElementById('pokemon-name');
const idEl = document.getElementById('pokemon-id');
const heightEl = document.getElementById('pokemon-height');
const weightEl = document.getElementById('pokemon-weight');
const typeEl = document.getElementById('pokemon-type');

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-message');
const infoEl = document.getElementById('pokemon-info');

const randomBtn = document.getElementById('random-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Global variable to keep track of the current Pokémon ID
let currentId = 1;

// Helper UI state functions
function showLoading() {
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    infoEl.classList.add('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
    infoEl.classList.remove('hidden');
}

function showError() {
    loadingEl.classList.add('hidden');
    infoEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
}

// Core fetch function by ID
async function fetchPokemon(id) {
    showLoading();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const data = await response.json();
        
        // Update global ID tracker
        currentId = data.id;
        console.log("Current Pokémon ID:", currentId);

        displayPokemon(data);
        hideLoading();
    } catch (error) {
        console.error(error);
        showError();
    }
}

// Display function to populate the DOM elements
function displayPokemon(pokemon) {
    nameEl.textContent = pokemon.name.toUpperCase();
    idEl.textContent = `#${pokemon.id}`;
    heightEl.textContent = pokemon.height;
    weightEl.textContent = pokemon.weight;
    typeEl.textContent = pokemon.types.map(t => t.type.name).join(', ');
    
    // Use official artwork or default sprite
    imgEl.src = pokemon.sprites.front_default || pokemon.sprites.other['official-artwork'].front_default;
}

// 1. Random Button Event
randomBtn.addEventListener('click', () => {
     // PokeAPI has over 1000 Pokémon, Gen 1-3 is usually within 1-898 or up to 1025
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(randomId);
});

// 2. Previous Button Event
prevBtn.addEventListener('click', () => {
    if (currentId > 1) {
        fetchPokemon(currentId - 1);
    } else {
        fetchPokemon(1); // Stay at the first Pokémon if trying to go lower than 1
    }
});

// 3. Next Button Event
nextBtn.addEventListener('click', () => {
    fetchPokemon(currentId + 1);
});

// Load an initial Pokémon on page load
fetchPokemon(1);