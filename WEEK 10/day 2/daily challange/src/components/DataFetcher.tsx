import type { ReactNode } from 'react';
import type { RequestStatus } from '../types/types';

interface DataFetcherProps<T> {
  items: T[];
  status: RequestStatus;
  error: string | null;
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  emptyMessage: string;
  onRetry: () => void;
}

export function DataFetcher<T>({
  items,
  status,
  error,
  renderItem,
  keyExtractor,
  emptyMessage,
  onRetry,
}: DataFetcherProps<T>) {
  if (status === 'loading' && items.length === 0) {
    return (
      <div className="recipe-grid" aria-label="Loading recipes" aria-busy="true">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="recipe-skeleton" key={index} />
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="message-state error-state" role="alert">
        <span className="message-mark" aria-hidden="true">!</span>
        <div>
          <h2>That search didn’t come through.</h2>
          <p>{error ?? 'Please check your connection and try again.'}</p>
          <button className="retry-button" type="button" onClick={onRetry}>Try again <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    );
  }

  if (status === 'succeeded' && items.length === 0) {
    return (
      <div className="message-state empty-state">
        <span className="message-mark" aria-hidden="true">⌕</span>
        <div>
          <h2>Nothing on the menu yet.</h2>
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`recipe-grid${status === 'loading' ? ' is-refreshing' : ''}`} aria-busy={status === 'loading'}>
      {items.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
}