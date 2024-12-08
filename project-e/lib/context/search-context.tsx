"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { SearchResult } from '@/lib/types';

interface SearchContextType {
  results: SearchResult | null;
  setResults: (results: SearchResult | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<SearchResult | null>(null);

  return (
    <SearchContext.Provider value={{ results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}