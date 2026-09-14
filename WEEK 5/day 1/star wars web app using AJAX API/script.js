// 1. Retrieve DOM elements
const btn = document.getElementById('btn');
const nameEl = document.getElementById('name');
const heightEl = document.getElementById('height');
const genderEl = document.getElementById('gender');
const birthYearEl = document.getElementById('birth-year');
const homeworldEl = document.getElementById('homeworld');

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-message');
const infoContainer = document.getElementById('character-info');

// Helper functions to manage UI states
function showLoading() {
    loadingEl.classList.remove('hidden');
    infoContainer.classList.add('hidden');
    errorEl.classList.add('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
    infoContainer.classList.remove('hidden');
}

function showError() {
    loadingEl.classList.add('hidden');
    infoContainer.classList.add('hidden');
    errorEl.classList.remove('hidden');
}

// 2. Get data from the API
async function getCharacter() {
    showLoading();
    
    // Generate a random ID between 1 and 83
    const randomId = Math.floor(Math.random() * 83) + 1;

    try {
        const response = await fetch(`https://www.swapi.tech/api/people/${randomId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch character data');
        }

        const data = await response.json();
        const characterProps = data.result.properties;

        // Fetch homeworld name (SWAPI returns a URL for the homeworld)
        const homeworldName = await getHomeworld(characterProps.homeworld);

        // 3. Display info on the DOM
        displayCharacter(characterProps, homeworldName);
        hideLoading();

    } catch (error) {
        console.error('Error:', error);
        showError();
    }
}

// Separate function to fetch the homeworld name
async function getHomeworld(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.result.properties.name;
    } catch (error) {
        return 'Unknown';
    }
}

function displayCharacter(person, homeworld) {
    nameEl.textContent = person.name;
    heightEl.textContent = person.height;
    genderEl.textContent = person.gender;
    birthYearEl.textContent = person.birth_year;
    homeworldEl.textContent = homeworld;
}

// Event Listener for the button click
btn.addEventListener('click', getCharacter);