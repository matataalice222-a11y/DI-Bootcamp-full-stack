import { useEffect, useState } from 'react';
import { DataFetcher } from './components/DataFetcher';
import { loadRecipes } from './features/dataSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import type { RecipeSummary } from './types/types';
import './App.css';

function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap">
        {recipe.image ? (
          <img className="recipe-image" src={recipe.image} alt={recipe.title} loading="lazy" />
        ) : (
          <div className="image-placeholder" aria-hidden="true">m.</div>
        )}
        <span className="source-tag">{recipe.source}</span>
      </div>
      <div className="recipe-card-body">
        <div className="recipe-meta">
          {recipe.readyInMinutes ? <span>{recipe.readyInMinutes} MIN</span> : <span>FROM THE KITCHEN</span>}
          {recipe.servings ? <span>{recipe.servings} SERVINGS</span> : null}
        </div>
        <h2>{recipe.title}</h2>
        <p>{recipe.summary}</p>
      </div>
    </article>
  );
}

export default function App() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.recipes);
  const [searchInput, setSearchInput] = useState('pasta');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [query, setQuery] = useState('pasta');
  const [apiKey, setApiKey] = useState('');
  const [requestRevision, setRequestRevision] = useState(0);

  useEffect(() => {
    const request = dispatch(loadRecipes({ query, apiKey: apiKey || undefined }));
    return () => request.abort();
  }, [apiKey, dispatch, query, requestRevision]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchInput.trim();
    if (!nextQuery) return;

    setQuery(nextQuery);
    setApiKey(apiKeyInput.trim());
    setRequestRevision((revision) => revision + 1);
  }

  function handleRetry() {
    setRequestRevision((revision) => revision + 1);
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Mise home"><span className="brand-icon">m</span>mise<span className="brand-dot">.</span></a>
        <span className="topbar-label">THE EVERYDAY RECIPE INDEX</span>
        <a className="about-link" href="#collection">Explore <span aria-hidden="true">↓</span></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> A GOOD PLACE TO START</p>
            <h1 id="hero-title">What sounds<br />good <em>today?</em></h1>
            <p className="hero-description">A little inspiration for whatever’s happening around your table.</p>
          </div>
          <div className="hero-still" role="img" aria-label="A freshly prepared meal with herbs and seasonal vegetables">
            <span>COOK SOMETHING LOVELY</span>
          </div>
          <div className="hero-index" aria-hidden="true">01 <span>/</span> 03</div>
        </section>

        <section className="search-panel" aria-label="Search recipes">
          <form className="search-form" onSubmit={handleSubmit}>
            <label className="search-field">
              <span className="field-label">I’M IN THE MOOD FOR</span>
              <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Try pasta, chicken, or curry" aria-label="Search for a recipe" />
            </label>
            <label className="key-field">
              <span className="field-label">SPOONACULAR KEY <span className="optional-label">OPTIONAL</span></span>
              <input type="password" value={apiKeyInput} onChange={(event) => setApiKeyInput(event.target.value)} placeholder="RapidAPI key" autoComplete="off" aria-label="Optional Spoonacular RapidAPI key" />
            </label>
            <button className="search-button" type="submit" aria-label="Search recipes">Find recipes <span aria-hidden="true">↗</span></button>
          </form>
          <p className="key-note">No key? Search uses TheMealDB. Your Spoonacular key stays in this browser session only.</p>
        </section>

        <section id="collection" className="collection" aria-labelledby="collection-heading">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">A FEW IDEAS FOR YOU</p>
              <h2 id="collection-heading">On the menu<span>.</span></h2>
            </div>
            <p className="result-count" aria-live="polite">{status === 'loading' ? 'FINDING RECIPES' : `${items.length} ${items.length === 1 ? 'RECIPE' : 'RECIPES'}`}</p>
          </div>

          <DataFetcher<RecipeSummary>
            items={items}
            status={status}
            error={error}
            keyExtractor={(recipe) => recipe.id}
            renderItem={(recipe) => <RecipeCard recipe={recipe} />}
            emptyMessage="Try another ingredient or dish name."
            onRetry={handleRetry}
          />
        </section>
      </main>

      <footer className="page-footer"><span>MISE EN PLACE, MADE SIMPLE</span><span>Good food begins somewhere.</span></footer>
    </div>
  );
}