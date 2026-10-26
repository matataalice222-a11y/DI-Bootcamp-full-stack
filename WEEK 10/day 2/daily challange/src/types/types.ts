export interface RecipeSummary {
  id: string;
  title: string;
  image: string;
  summary: string;
  source: 'TheMealDB' | 'Spoonacular';
  readyInMinutes?: number;
  servings?: number;
}

export interface FetchRecipesArgs {
  query: string;
  apiKey?: string;
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface DataState<T> {
  items: T[];
  status: RequestStatus;
  error: string | null;
}