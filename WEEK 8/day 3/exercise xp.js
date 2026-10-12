import React, { createContext, useContext, useRef, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export function Content() {
  const { theme } = useContext(ThemeContext);

  const styles = {
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#111111" : "#ffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.3s ease",
  };

  return (
    <div style={styles}>
      <h1>{theme === "light" ? "Light Theme" : "Dark Theme"}</h1>
      <ThemeSwitcher />
    </div>
  );
}

export function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInput = () => {
    setCount(inputRef.current.value.length);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        ref={inputRef}
        onInput={handleInput}
        placeholder="Type something..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <p>Character count: {count}</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Content />
        <CharacterCounter />
      </div>
    </ThemeProvider>
  );
}

