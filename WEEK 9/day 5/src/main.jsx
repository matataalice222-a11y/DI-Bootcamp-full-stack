import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BookList } from "./BookList.jsx";
import { store } from "../exercise xp.js";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BookList />
    </Provider>
  </React.StrictMode>,
);
