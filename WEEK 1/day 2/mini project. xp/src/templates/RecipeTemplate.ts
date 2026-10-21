import type { RecipeItem } from "../model/RecipeItem";

export class RecipeTemplate {
  constructor(private readonly container: HTMLElement) {}

  render(
    recipes: RecipeItem[],
    onToggleFavorite: (id: string) => void,
    onDelete: (id: string) => void,
  ): void {
    this.container.replaceChildren();

    if (recipes.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "empty-state";
      emptyState.textContent =
        "No recipes yet. Add your first recipe using the form above.";
      this.container.append(emptyState);
      return;
    }

    recipes.forEach((recipe) => {
      this.container.append(
        this.createRecipeCard(recipe, onToggleFavorite, onDelete),
      );
    });
  }

  private createRecipeCard(
    recipe: RecipeItem,
    onToggleFavorite: (id: string) => void,
    onDelete: (id: string) => void,
  ): HTMLElement {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "recipe-card-header";

    const title = document.createElement("h3");
    title.textContent = recipe.title;
    cardHeader.append(title);

    const favoriteButton = document.createElement("button");
    favoriteButton.className = "icon-button favorite-button";
    favoriteButton.type = "button";
    favoriteButton.textContent = recipe.isFavorite ? "★" : "☆";
    favoriteButton.setAttribute(
      "aria-label",
      recipe.isFavorite ? "Remove from favorites" : "Add to favorites",
    );
    favoriteButton.setAttribute("aria-pressed", String(recipe.isFavorite));
    favoriteButton.addEventListener("click", () => onToggleFavorite(recipe.id));
    cardHeader.append(favoriteButton);

    const details = document.createElement("div");
    details.className = "recipe-details";
    details.hidden = true;

    const ingredientsHeading = document.createElement("h4");
    ingredientsHeading.textContent = "Ingredients";
    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient;
      ingredientsList.append(listItem);
    });

    const instructionsHeading = document.createElement("h4");
    instructionsHeading.textContent = "Instructions";
    const instructions = document.createElement("p");
    instructions.textContent = recipe.instructions;
    details.append(
      ingredientsHeading,
      ingredientsList,
      instructionsHeading,
      instructions,
    );

    const actions = document.createElement("div");
    actions.className = "recipe-actions";
    const detailsButton = document.createElement("button");
    detailsButton.className = "button button-secondary";
    detailsButton.type = "button";
    detailsButton.textContent = "Show details";
    detailsButton.setAttribute("aria-expanded", "false");
    detailsButton.addEventListener("click", () => {
      details.hidden = !details.hidden;
      detailsButton.textContent = details.hidden ? "Show details" : "Hide details";
      detailsButton.setAttribute("aria-expanded", String(!details.hidden));
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "button button-danger";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => onDelete(recipe.id));
    actions.append(detailsButton, deleteButton);

    card.append(cardHeader, details, actions);
    return card;
  }
}
