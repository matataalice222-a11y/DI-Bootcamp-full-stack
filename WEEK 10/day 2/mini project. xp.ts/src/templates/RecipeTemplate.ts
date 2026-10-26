import { RecipeItem } from '../model/RecipeItem';

export type RecipeFilter = 'all' | 'favorites';

export class RecipeTemplate {
  private container: HTMLElement;
  private onFavorite: (id: string) => void;
  private onDelete: (id: string) => void;

  constructor(
    container: HTMLElement,
    onFavorite: (id: string) => void,
    onDelete: (id: string) => void,
  ) {
    this.container = container;
    this.onFavorite = onFavorite;
    this.onDelete = onDelete;
  }

  render(recipes: RecipeItem[], filter: RecipeFilter): void {
    const visibleRecipes = filter === 'favorites'
      ? recipes.filter((recipe) => recipe.isFavorite)
      : recipes;

    this.container.replaceChildren();

    if (visibleRecipes.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      const mark = document.createElement('span');
      mark.className = 'empty-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = filter === 'favorites' ? '\u2606' : '\u2726';
      const message = document.createElement('p');
      message.textContent = filter === 'favorites'
        ? 'Your favorites will find a home here.'
        : 'Your book is open. Add the first recipe when you are ready.';
      emptyState.append(mark, message);
      this.container.append(emptyState);
      return;
    }

    visibleRecipes.forEach((recipe, index) => {
      this.container.append(this.createCard(recipe, index));
    });
  }

  private createCard(recipe: RecipeItem, index: number): HTMLElement {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.style.setProperty('--card-index', String(index));

    const header = document.createElement('div');
    header.className = 'recipe-card-header';

    const title = document.createElement('h3');
    title.textContent = recipe.title;
    header.append(title);

    const actions = document.createElement('div');
    actions.className = 'recipe-actions';

    const favoriteButton = document.createElement('button');
    favoriteButton.className = `favorite-button${recipe.isFavorite ? ' is-favorite' : ''}`;
    favoriteButton.type = 'button';
    favoriteButton.setAttribute('aria-pressed', String(recipe.isFavorite));
    favoriteButton.setAttribute('aria-label', `${recipe.isFavorite ? 'Remove' : 'Add'} ${recipe.title} ${recipe.isFavorite ? 'from' : 'to'} favorites`);
    favoriteButton.title = recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites';
    favoriteButton.textContent = recipe.isFavorite ? '\u2605' : '\u2606';
    favoriteButton.addEventListener('click', () => this.onFavorite(recipe.id));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.setAttribute('aria-label', `Delete ${recipe.title}`);
    deleteButton.title = 'Delete recipe';
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => this.onDelete(recipe.id));
    actions.append(favoriteButton, deleteButton);
    header.append(actions);

    const details = document.createElement('details');
    details.className = 'recipe-details';
    const summary = document.createElement('summary');
    summary.textContent = 'View recipe';
    details.append(summary);

    const content = document.createElement('div');
    content.className = 'recipe-content';
    const ingredientsHeading = document.createElement('h4');
    ingredientsHeading.textContent = 'Ingredients';
    const ingredientList = document.createElement('ul');
    recipe.ingredients.forEach((ingredient) => {
      const item = document.createElement('li');
      item.textContent = ingredient;
      ingredientList.append(item);
    });

    const instructionsHeading = document.createElement('h4');
    instructionsHeading.textContent = 'Method';
    const instructions = document.createElement('p');
    instructions.textContent = recipe.instructions;
    content.append(ingredientsHeading, ingredientList, instructionsHeading, instructions);
    details.append(content);
    card.append(header, details);
    return card;
  }
}