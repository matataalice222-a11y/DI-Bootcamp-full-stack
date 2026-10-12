import React, { useState } from "react";

const quotes = [
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
];

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

function QuoteBox() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [bgColor, setBgColor] = useState("#f4f4f4");

  const getRandomQuote = () => {
    let nextIndex = Math.floor(Math.random() * quotes.length);

    while (nextIndex === quoteIndex && quotes.length > 1) {
      nextIndex = Math.floor(Math.random() * quotes.length);
    }

    setQuoteIndex(nextIndex);
    setBgColor(getRandomColor());
  };

  const currentQuote = quotes[quoteIndex];

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.5s ease",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.18)",
        }}
      >
        <h1 style={{ color: bgColor, fontSize: "2rem", margin: 0 }}>{currentQuote.text}</h1>
        <p style={{ fontStyle: "italic", marginTop: "1rem", fontSize: "1.1rem" }}>
          — {currentQuote.author}
        </p>

        <button
          onClick={getRandomQuote}
          style={{
            marginTop: "2rem",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: bgColor,
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "all 0.3s ease",
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default QuoteBox;
