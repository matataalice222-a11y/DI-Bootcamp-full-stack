import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  deleteTasksForCategory,
  editCategory,
  selectCategories,
} from "../../daily challange.js";

export function CategorySelector({ selectedCategory, onSelectCategory }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = useCallback(
    (event) => {
      event.preventDefault();
      const name = newCategoryName.trim();
      if (!name) return;
      dispatch(
        addCategory({
          id: `category-${crypto.randomUUID()}`,
          name,
          color: "#52796f",
        }),
      );
      setNewCategoryName("");
    },
    [dispatch, newCategoryName],
  );

  const handleRenameCategory = useCallback(
    (category) => {
      const name = window.prompt("Rename category", category.name)?.trim();
      if (name) dispatch(editCategory({ id: category.id, changes: { name } }));
    },
    [dispatch],
  );

  const handleDeleteCategory = useCallback(
    (category) => {
      const confirmed = window.confirm(
        `Delete "${category.name}" and its tasks?`,
      );
      if (!confirmed) return;
      dispatch(deleteTasksForCategory(category.id));
      dispatch(deleteCategory(category.id));
      if (selectedCategory === category.id) onSelectCategory("all");
    },
    [dispatch, onSelectCategory, selectedCategory],
  );

  return (
    <section className="sidebar-section" aria-labelledby="categories-heading">
      <div className="section-label-row">
        <h2 id="categories-heading" className="section-label">
          Categories
        </h2>
        <span className="category-total">{categories.length}</span>
      </div>

      <nav className="category-list" aria-label="Task categories">
        <button
          type="button"
          className={`category-option${selectedCategory === "all" ? " active" : ""}`}
          aria-pressed={selectedCategory === "all"}
          onClick={() => onSelectCategory("all")}
        >
          <span className="category-dot all-dot" aria-hidden="true" />
          <span>All tasks</span>
        </button>
        {categories.map((category) => (
          <div className="category-row" key={category.id}>
            <button
              type="button"
              className={`category-option${selectedCategory === category.id ? " active" : ""}`}
              aria-pressed={selectedCategory === category.id}
              onClick={() => onSelectCategory(category.id)}
            >
              <span
                className="category-dot"
                style={{ "--category-color": category.color }}
                aria-hidden="true"
              />
              <span>{category.name}</span>
            </button>
            <div className="category-actions">
              <button
                type="button"
                className="icon-button"
                aria-label={`Rename ${category.name}`}
                onClick={() => handleRenameCategory(category)}
              >
                Edit
              </button>
              <button
                type="button"
                className="icon-button delete-category"
                aria-label={`Delete ${category.name}`}
                onClick={() => handleDeleteCategory(category)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </nav>

      <form className="category-form" onSubmit={handleAddCategory}>
        <label className="visually-hidden" htmlFor="new-category">
          New category name
        </label>
        <input
          id="new-category"
          value={newCategoryName}
          onChange={(event) => setNewCategoryName(event.target.value)}
          placeholder="New category"
          maxLength={32}
        />
        <button type="submit" aria-label="Add category">
          +
        </button>
      </form>
    </section>
  );
}
