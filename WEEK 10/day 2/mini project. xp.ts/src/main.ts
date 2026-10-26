import './style.css';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeItem } from './model/RecipeItem';
import { RecipeTemplate, type RecipeFilter } from './templates/RecipeTemplate';

const form = document.querySelector<HTMLFormElement>('#recipeEntryForm');
const titleInput = document.querySelector<HTMLInputElement>('#recipeTitle');
const ingredientsInput = document.querySelector<HTMLTextAreaElement>('#ingredients');
const instructionsInput = document.querySelector<HTMLTextAreaElement>('#instructions');
const recipeContainer = document.querySelector<HTMLElement>('#recipeContainer');
const recipeCount = document.querySelector<HTMLElement>('#recipeCount');
const visibleCount = document.querySelector<HTMLElement>('#visibleCount');
const clearButton = document.querySelector<HTMLButtonElement>('#clearRecipesButton');
const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');

if (!form || !titleInput || !ingredientsInput || !instructionsInput || !recipeContainer || !recipeCount || !visibleCount || !clearButton) {
  throw new Error('The recipe book interface could not be initialized.');
}

const recipeCountElement = recipeCount;
const visibleCountElement = visibleCount;
const collection = new RecipeCollection();
let activeFilter: RecipeFilter = 'all';

const template = new RecipeTemplate(
  recipeContainer,
  (id) => {
    collection.toggleFavorite(id);
    renderRecipes();
  },
  (id) => {
    collection.removeRecipe(id);
    renderRecipes();
  },
);

function renderRecipes(): void {
  const recipes = collection.getRecipes();
  const favoriteCount = recipes.filter((recipe) => recipe.isFavorite).length;

  recipeCountElement.textContent = String(recipes.length);
  visibleCountElement.textContent = activeFilter === 'favorites'
    ? `${favoriteCount} saved favorite${favoriteCount === 1 ? '' : 's'}`
    : `${recipes.length} recipe${recipes.length === 1 ? '' : 's'}`;
  template.render(recipes, activeFilter);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const ingredients = ingredientsInput.value
    .split('\n')
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
  const instructions = instructionsInput.value.trim();

  if (!title || ingredients.length === 0 || !instructions) return;

  collection.addRecipe(new RecipeItem(title, ingredients, instructions));
  form.reset();
  titleInput.focus();
  activeFilter = 'all';
  updateFilterButtons();
  renderRecipes();
});

clearButton.addEventListener('click', () => {
  if (collection.getRecipes().length === 0) return;
  if (!window.confirm('Clear every recipe in your collection?')) return;

  collection.clearRecipes();
  activeFilter = 'all';
  updateFilterButtons();
  renderRecipes();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    if (filter !== 'all' && filter !== 'favorites') return;

    activeFilter = filter;
    updateFilterButtons();
    renderRecipes();
  });
});

function updateFilterButtons(): void {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

renderRecipes();