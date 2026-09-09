const quotes = [
    { id: 0, author: "Carl Sandburg", quote: "Nothing happens unless first we dream.", likes: 0 },
    { id: 1, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", likes: 0 },
    { id: 2, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken.", likes: 0 },
    { id: 3, author: "Nelson Mandela", quote: "It always seems impossible until it's done.", likes: 0 }
];

let currentQuote = null;
let lastRandomIndex = -1;
let filteredQuotes = [];
let currentFilterIndex = 0;

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const actionButtons = document.getElementById("action-buttons");
const statDisplay = document.getElementById("stat-display");
const likeCount = document.getElementById("like-count");
const filterNav = document.getElementById("filter-nav");

function displayQuote(quote) {
    currentQuote = quote;
    quoteText.textContent = `"${quote.quote}"`;
    quoteAuthor.textContent = `- ${quote.author}`;
    likeCount.textContent = quote.likes;
    actionButtons.hidden = false;
    statDisplay.textContent = "";
}

function getRandomQuote() {
    if (quotes.length === 0) {
        return;
    }

    let randomIndex = Math.floor(Math.random() * quotes.length);
    if (quotes.length > 1) {
        while (randomIndex === lastRandomIndex) {
            randomIndex = Math.floor(Math.random() * quotes.length);
        }
    }

    lastRandomIndex = randomIndex;
    filterNav.hidden = true;
    displayQuote(quotes[randomIndex]);
}

function showFilteredQuote() {
    if (filteredQuotes.length === 0) {
        return;
    }

    displayQuote(filteredQuotes[currentFilterIndex]);
    filterNav.hidden = false;
}

document.getElementById("generate-btn").addEventListener("click", getRandomQuote);

document.getElementById("add-quote-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const quoteInput = document.getElementById("new-quote");
    const authorInput = document.getElementById("new-author");
    const quoteTextValue = quoteInput.value.trim();
    const authorValue = authorInput.value.trim();

    if (!quoteTextValue || !authorValue) {
        return;
    }

    quotes.push({
        id: quotes.length,
        author: authorValue,
        quote: quoteTextValue,
        likes: 0
    });

    event.target.reset();
    statDisplay.textContent = "Quote added.";
});

document.getElementById("char-with-space").addEventListener("click", () => {
    if (currentQuote) {
        statDisplay.textContent = `Characters including spaces: ${currentQuote.quote.length}`;
    }
});

document.getElementById("char-no-space").addEventListener("click", () => {
    if (currentQuote) {
        statDisplay.textContent = `Characters excluding spaces: ${currentQuote.quote.replace(/\s/g, "").length}`;
    }
});

document.getElementById("word-count").addEventListener("click", () => {
    if (currentQuote) {
        statDisplay.textContent = `Word count: ${currentQuote.quote.trim().split(/\s+/).length}`;
    }
});

document.getElementById("like-btn").addEventListener("click", () => {
    if (currentQuote) {
        currentQuote.likes += 1;
        likeCount.textContent = currentQuote.likes;
    }
});

document.getElementById("filter-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const searchAuthor = document.getElementById("filter-author").value.trim().toLowerCase();
    filteredQuotes = quotes.filter((quote) => quote.author.toLowerCase().includes(searchAuthor));

    if (filteredQuotes.length === 0) {
        currentQuote = null;
        quoteText.textContent = "No quotes found for this author.";
        quoteAuthor.textContent = "";
        actionButtons.hidden = true;
        filterNav.hidden = true;
        return;
    }

    currentFilterIndex = 0;
    showFilteredQuote();
});

document.getElementById("next-btn").addEventListener("click", () => {
    currentFilterIndex = (currentFilterIndex + 1) % filteredQuotes.length;
    showFilteredQuote();
});

document.getElementById("prev-btn").addEventListener("click", () => {
    currentFilterIndex = (currentFilterIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    showFilteredQuote();
});
