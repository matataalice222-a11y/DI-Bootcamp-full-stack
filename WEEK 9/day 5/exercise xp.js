import { createSelector, createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  books: [
    {
      id: "horror-1",
      title: "The Haunting of Hill House",
      author: "Shirley Jackson",
      genre: "Horror",
    },
    {
      id: "horror-2",
      title: "Dracula",
      author: "Bram Stoker",
      genre: "Horror",
    },
    {
      id: "horror-3",
      title: "The Shining",
      author: "Stephen King",
      genre: "Horror",
    },
    {
      id: "fantasy-1",
      title: "A Wizard of Earthsea",
      author: "Ursula K. Le Guin",
      genre: "Fantasy",
    },
    {
      id: "fantasy-2",
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      genre: "Fantasy",
    },
    {
      id: "fantasy-3",
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      genre: "Fantasy",
    },
    {
      id: "science-fiction-1",
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
    },
    {
      id: "science-fiction-2",
      title: "Kindred",
      author: "Octavia E. Butler",
      genre: "Science Fiction",
    },
    {
      id: "science-fiction-3",
      title: "The Left Hand of Darkness",
      author: "Ursula K. Le Guin",
      genre: "Science Fiction",
    },
  ],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
    },
    removeBook(state, action) {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export const selectBooks = (state) => state.books.books;

export const selectHorrorBooks = createSelector([selectBooks], (books) =>
  books.filter((book) => book.genre === "Horror"),
);

export const selectFantasyBooks = createSelector([selectBooks], (books) =>
  books.filter((book) => book.genre === "Fantasy"),
);

export const selectScienceFictionBooks = createSelector(
  [selectBooks],
  (books) => books.filter((book) => book.genre === "Science Fiction"),
);

export const genreSelectors = {
  all: selectBooks,
  horror: selectHorrorBooks,
  fantasy: selectFantasyBooks,
  scienceFiction: selectScienceFictionBooks,
};