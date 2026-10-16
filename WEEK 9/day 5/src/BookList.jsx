import { useState } from "react";
import { useSelector } from "react-redux";
import { genreSelectors } from "../exercise xp.js";

const genres = [
  { id: "all", label: "All books" },
  { id: "horror", label: "Horror" },
  { id: "fantasy", label: "Fantasy" },
  { id: "scienceFiction", label: "Science Fiction" },
];

export function BookList() {
  const [activeGenre, setActiveGenre] = useState("all");
  const books = useSelector(genreSelectors[activeGenre]);
  const activeLabel = genres.find((genre) => genre.id === activeGenre)?.label;

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">Your personal library</p>
        <h1>Find your next read.</h1>
        <p className="hero-copy">
          Browse the shelves and filter the collection by genre.
        </p>
      </header>

      <section className="inventory" aria-labelledby="inventory-heading">
        <div className="inventory-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 id="inventory-heading">{activeLabel}</h2>
          </div>
          <span className="book-count" aria-live="polite">
            {books.length} {books.length === 1 ? "book" : "books"}
          </span>
        </div>

        <div className="genre-filter" aria-label="Filter books by genre">
          {genres.map((genre) => (
            <button
              className="genre-button"
              type="button"
              key={genre.id}
              aria-pressed={activeGenre === genre.id}
              onClick={() => setActiveGenre(genre.id)}
            >
              {genre.label}
            </button>
          ))}
        </div>

        {books.length > 0 ? (
          <ul className="book-grid">
            {books.map((book) => (
              <li className="book-card" key={book.id}>
                <span className="book-genre">{book.genre}</span>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">There are no books in this collection yet.</p>
        )}
      </section>
    </main>
  );
}
