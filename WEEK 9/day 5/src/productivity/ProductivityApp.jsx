import { useState } from "react";
import { CategorySelector } from "./CategorySelector.jsx";
import { TaskList } from "./TaskList.jsx";

export function ProductivityApp() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <main className="tracker-shell">
      <aside className="sidebar">
        <a className="brand" href="./productivity.html" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">
            d
          </span>
          <span>daymark</span>
        </a>
        <p className="sidebar-intro">
          A calmer way to keep track of what matters.
        </p>
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <a className="exercise-link" href="./index.html">
          ← Book inventory exercise
        </a>
      </aside>
      <TaskList selectedCategory={selectedCategory} />
    </main>
  );
}
