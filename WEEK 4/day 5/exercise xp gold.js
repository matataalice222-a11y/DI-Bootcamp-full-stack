const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const url = `https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=${apiKey}`;

async function fetchRandomGif() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    const gifs = data.data;
    if (gifs.length === 0) {
      throw new Error("No GIFs found!");
    }
    
    const randomIndex = Math.floor(Math.random() * gifs.length);
    const randomGifUrl = gifs[randomIndex].images.original.url;
    
    const img = document.createElement("img");
    img.src = randomGifUrl;
    document.body.appendChild(img);
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function() {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      })
    );
    
    console.log("users", users);
    console.log("posts", posts);   // fixed typo
    console.log("albums", albums);
    
  } catch (error) {
    console.error("ooooooops", error); // log error details
  }
}

getData();
