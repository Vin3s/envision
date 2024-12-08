import { SearchResult } from './types';

export async function performSearch(query: string): Promise<SearchResult> {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
    throw new Error(error.error || 'Search failed');
  }

  return await response.json();
}

export async function fetchSearchHistory(): Promise<SearchResult[]> {
  const response = await fetch('/api/search/history');
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
    throw new Error(error.error || 'Failed to fetch search history');
  }
  
  return await response.json();
}