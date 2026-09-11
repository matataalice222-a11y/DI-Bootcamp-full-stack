const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const url = `https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=${apiKey}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("An error occurred:", error));
const api = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const sunUrl = `https://api.giphy.com/v1/gifs/search?q=sun&rating=g&limit=10&offset=2&api_key=${apiKey}`;

fetch(sunUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("An error occurred:", error));
async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const objectStarWars = await response.json();
    console.log(objectStarWars); // inspect full response
    console.log(objectStarWars.result); // access specific property
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

getStarship();
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => resolve("resolved"), 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();
calling
(2-second )
resolved
