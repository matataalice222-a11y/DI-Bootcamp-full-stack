const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.getElementById("gif-form");
const input = document.getElementById("category-input");
const gifContainer = document.getElementById("gif-container");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Fetch one random GIF based on user search category
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    // Using the Giphy API endpoint with the search query and API key
    const url = `https://api.giphy.com/v1/gifs/random?tag=${encodeURIComponent(query)}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const gifUrl = data.data.images.original.url;

        // Create container for the GIF and its individual delete button
        const gifCard = document.createElement("div");
        gifCard.classList.add("gif-card");

        const img = document.createElement("img");
        img.src = gifUrl;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        
        // Allow the user to delete a specific gif
        deleteBtn.addEventListener("click", function() {
            gifCard.remove();
        });

        gifCard.appendChild(img);
        gifCard.appendChild(deleteBtn);
        gifContainer.appendChild(gifCard);

    } catch (error) {
        console.error("An error occurred while fetching the GIF:", error);
    }

    input.value = ""; // Reset input field
});

// Allow the user to remove all of the GIFs
deleteAllBtn.addEventListener("click", function() {
    gifContainer.innerHTML = "";
});