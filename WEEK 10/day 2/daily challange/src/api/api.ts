import type { FetchRecipesArgs, RecipeSummary } from '../types/types';

const SPOONACULAR_HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null
    ? value as Record<string, unknown>
    : null;
}

function cleanSummary(value: unknown): string {
  if (typeof value !== 'string') return 'Open this recipe to discover the ingredients and method.';

  const summary = value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return summary || 'Open this recipe to discover the ingredients and method.';
}

async function readResponse(response: Response): Promise<unknown> {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Spoonacular rejected the API key. Check your RapidAPI subscription and key.');
    }
    if (response.status === 429) {
      throw new Error('The API request limit has been reached. Try again later.');
    }
    throw new Error(`Recipe search failed (${response.status}). Please try again.`);
  }

  return response.json() as Promise<unknown>;
}

async function fetchFromSpoonacular(
  query: string,
  apiKey: string,
  signal: AbortSignal,
): Promise<RecipeSummary[]> {
  const url = new URL(`https://${SPOONACULAR_HOST}/recipes/complexSearch`);
  url.search = new URLSearchParams({
    query,
    number: '12',
    addRecipeInformation: 'true',
  }).toString();

  const response = await fetch(url, {
    signal,
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': SPOONACULAR_HOST,
    },
  });
  const payload = asRecord(await readResponse(response));
  const results = Array.isArray(payload?.results) ? payload.results : [];

  return results.flatMap((result): RecipeSummary[] => {
    const recipe = asRecord(result);
    if (typeof recipe?.id !== 'number' || typeof recipe.title !== 'string') return [];

    return [{
      id: `spoonacular-${recipe.id}`,
      title: recipe.title,
      image: typeof recipe.image === 'string' ? recipe.image : '',
      summary: cleanSummary(recipe.summary),
      source: 'Spoonacular',
      ...(typeof recipe.readyInMinutes === 'number' ? { readyInMinutes: recipe.readyInMinutes } : {}),
      ...(typeof recipe.servings === 'number' ? { servings: recipe.servings } : {}),
    }];
  });
}

async function fetchFromMealDB(query: string, signal: AbortSignal): Promise<RecipeSummary[]> {
  const url = new URL('https://www.themealdb.com/api/json/v1/1/search.php');
  url.searchParams.set('s', query);
  const response = await fetch(url, { signal });
  const payload = asRecord(await readResponse(response));
  const meals = Array.isArray(payload?.meals) ? payload.meals : [];

  return meals.flatMap((meal): RecipeSummary[] => {
    const recipe = asRecord(meal);
    if (typeof recipe?.idMeal !== 'string' || typeof recipe.strMeal !== 'string') return [];

    return [{
      id: `mealdb-${recipe.idMeal}`,
      title: recipe.strMeal,
      image: typeof recipe.strMealThumb === 'string' ? recipe.strMealThumb : '',
      summary: cleanSummary(recipe.strInstructions),
      source: 'TheMealDB',
    }];
  });
}

export function fetchRecipes(
  { query, apiKey }: FetchRecipesArgs,
  signal: AbortSignal,
): Promise<RecipeSummary[]> {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return Promise.resolve([]);

  return apiKey?.trim()
    ? fetchFromSpoonacular(normalizedQuery, apiKey.trim(), signal)
    : fetchFromMealDB(normalizedQuery, signal);
}