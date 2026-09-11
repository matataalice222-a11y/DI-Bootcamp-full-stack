const form = document.getElementById("sunrise-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    // Retrieve values from the 4 inputs
    const lat1 = document.getElementById("lat1").value;
    const lng1 = document.getElementById("lng1").value;
    const lat2 = document.getElementById("lat2").value;
    const lng2 = document.getElementById("lng2").value;

    // Construct API endpoints for both cities
    const urlCity1 = `https://api.sunrise-sunset.org/json?lat=${lat1}&lng=${lng1}&formatted=0`;
    const urlCity2 = `https://api.sunrise-sunset.org/json?lat=${lat2}&lng=${lng2}&formatted=0`;

    resultDiv.textContent = "Loading sunrise times...";

    try {
        // Use Promise.all() to wait for both fetch requests to finish successfully
        const [response1, response2] = await Promise.all([
            fetch(urlCity1),
            fetch(urlCity2)
        ]);

        if (!response1.ok || !response2.ok) {
            throw new Error("Failed to fetch sunrise data from one or more APIs.");
        }

        const [data1, data2] = await Promise.all([
            response1.json(),
            response2.json()
        ]);

        // Extract sunrise times
        const sunriseCity1 = data1.results.sunrise;
        const sunriseCity2 = data2.results.sunrise;

        // Display results on the page ONLY when both promises resolve
        resultDiv.innerHTML = `
            <p>City 1 Sunrise: ${sunriseCity1}</p>
            <p>City 2 Sunrise: ${sunriseCity2}</p>
        `;

    } catch (error) {
        console.error("An error occurred:", error);
        resultDiv.textContent = "An error occurred while fetching data. Please try again.";
    }
});