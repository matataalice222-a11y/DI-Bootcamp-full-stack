import { RecipeItem } from './RecipeItem';

const STORAGE_KEY = 'gathered-recipes';

export class RecipeCollection {
  private recipes: RecipeItem[];

  constructor() {
    this.recipes = this.loadFromStorage();
  }

  getRecipes(): RecipeItem[] {
    return [...this.recipes];
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.unshift(recipe);
    this.saveToStorage();
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.saveToStorage();
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find((item) => item.id === id);
    if (!recipe) return;

    recipe.isFavorite = !recipe.isFavorite;
    this.saveToStorage();
  }

  clearRecipes(): void {
    this.recipes = [];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recipes));
    } catch {
      console.error('Recipes could not be saved to local storage.');
    }
  }

  private loadFromStorage(): RecipeItem[] {
    try {
      const savedRecipes: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(savedRecipes)) return [];

      return savedRecipes.flatMap((saved): RecipeItem[] => {
        if (
          typeof saved !== 'object' || saved === null ||
          typeof saved.id !== 'string' || typeof saved.title !== 'string' ||
          !Array.isArray(saved.ingredients) ||
          !saved.ingredients.every((ingredient: unknown) => typeof ingredient === 'string') ||
          typeof saved.instructions !== 'string'
        ) {
          return [];
        }

        return [new RecipeItem(
          saved.title,
          saved.ingredients,
          saved.instructions,
          saved.id,
          saved.isFavorite === true,
        )];
      });
    } catch {
      return [];
    }
  }
}