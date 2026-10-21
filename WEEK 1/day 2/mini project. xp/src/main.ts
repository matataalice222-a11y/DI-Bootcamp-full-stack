import { RecipeCollection } from "./model/RecipeCollection";
import { RecipeTemplate } from "./templates/RecipeTemplate";
import "./style.css";

const form = document.querySelector<HTMLFormElement>("#recipeEntryForm");
const titleInput = document.querySelector<HTMLInputElement>("#recipeTitle");
const ingredientsInput =
  document.querySelector<HTMLTextAreaElement>("#ingredients");
const instructionsInput =
  document.querySelector<HTMLTextAreaElement>("#instructions");
const recipeContainer = document.querySelector<HTMLElement>("#recipeContainer");
const clearRecipesButton =
  document.querySelector<HTMLButtonElement>("#clearRecipesButton");
const statusMessage = document.querySelector<HTMLElement>("#statusMessage");

if (
  !form ||
  !titleInput ||
  !ingredientsInput ||
  !instructionsInput ||
  !recipeContainer ||
  !clearRecipesButton ||
  !statusMessage
) {
  throw new Error("The recipe book page is missing a required element.");
}

const status = statusMessage;
if (!status) {
  throw new Error("The recipe book page is missing a required element.");
}

function showError(error: unknown): void {
  status.textContent =
    error instanceof Error ? error.message : "An unexpected error occurred.";
  status.classList.add("status-error");
}

function showMessage(message: string): void {
  status.textContent = message;
  status.classList.remove("status-error");
}

try {
  const collection = new RecipeCollection();
  const template = new RecipeTemplate(recipeContainer);

  function renderRecipes(): void {
    template.render(
      collection.getAll(),
      (id) => {
        try {
          collection.toggleFavorite(id);
          renderRecipes();
          showMessage("Favorite status updated.");
        } catch (error) {
          showError(error);
        }
      },
      (id) => {
        try {
          collection.removeRecipe(id);
          renderRecipes();
          showMessage("Recipe deleted.");
        } catch (error) {
          showError(error);
        }
      },
    );
  }

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const ingredients = ingredientsInput.value
      .split(/\r?\n/)
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);
    const instructions = instructionsInput.value.trim();

    if (!title || ingredients.length === 0 || !instructions) {
      showError(new Error("Add a title, at least one ingredient, and instructions."));
      return;
    }

    try {
      collection.addRecipe(title, ingredients, instructions);
      form.reset();
      renderRecipes();
      showMessage("Recipe added.");
      titleInput.focus();
    } catch (error) {
      showError(error);
    }
  });

  clearRecipesButton.addEventListener("click", () => {
    if (collection.getAll().length === 0) {
      showMessage("There are no recipes to clear.");
      return;
    }

    if (!window.confirm("Delete all saved recipes? This cannot be undone.")) {
      return;
    }

    try {
      collection.clear();
      renderRecipes();
      showMessage("All recipes cleared.");
    } catch (error) {
      showError(error);
    }
  });

  renderRecipes();
} catch (error) {
  showError(error);
  form.querySelectorAll("input, textarea, button").forEach((control) => {
    control.setAttribute("disabled", "true");
  });
}
