import { RecipeItem, type RecipeData } from "./RecipeItem";

const STORAGE_KEY = "recipe-book-recipes";

export class RecipeCollection {
  private recipes: RecipeItem[];

  constructor() {
    this.recipes = this.loadFromLocalStorage();
  }

  getAll(): RecipeItem[] {
    return [...this.recipes];
  }

  addRecipe(
    title: string,
    ingredients: string[],
    instructions: string,
  ): RecipeItem {
    const recipe = new RecipeItem(title, ingredients, instructions);
    this.recipes.push(recipe);
    this.saveToLocalStorage();
    return recipe;
  }

  removeRecipe(id: string): void {
    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex === -1) {
      return;
    }

    const [removedRecipe] = this.recipes.splice(recipeIndex, 1);
    try {
      this.saveToLocalStorage();
    } catch (error) {
      this.recipes.splice(recipeIndex, 0, removedRecipe);
      throw error;
    }
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find((item) => item.id === id);
    if (!recipe) {
      return;
    }

    recipe.isFavorite = !recipe.isFavorite;
    try {
      this.saveToLocalStorage();
    } catch (error) {
      recipe.isFavorite = !recipe.isFavorite;
      throw error;
    }
  }

  clear(): void {
    const previousRecipes = this.recipes;
    this.recipes = [];
    try {
      this.saveToLocalStorage();
    } catch (error) {
      this.recipes = previousRecipes;
      throw error;
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recipes));
  }

  private loadFromLocalStorage(): RecipeItem[] {
    const storedRecipes = localStorage.getItem(STORAGE_KEY);
    if (storedRecipes === null) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedRecipes);
    if (!Array.isArray(parsed)) {
      throw new Error("Saved recipes are invalid: expected a recipe list.");
    }

    return parsed.map((item: unknown, index: number) => {
      if (!isRecipeData(item)) {
        throw new Error(`Saved recipe at position ${index + 1} is invalid.`);
      }
      return RecipeItem.fromData(item);
    });
  }
}

function isRecipeData(value: unknown): value is RecipeData {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const recipe = value as Record<string, unknown>;
  return (
    typeof recipe.id === "string" &&
    typeof recipe.title === "string" &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.every((ingredient) => typeof ingredient === "string") &&
    typeof recipe.instructions === "string" &&
    typeof recipe.isFavorite === "boolean"
  );
}
