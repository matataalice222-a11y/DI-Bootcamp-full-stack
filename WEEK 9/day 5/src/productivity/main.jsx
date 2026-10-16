import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../../daily challange.js";
import { ProductivityApp } from "./ProductivityApp.jsx";
import "./productivity.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductivityApp />
    </Provider>
  </React.StrictMode>,
);
