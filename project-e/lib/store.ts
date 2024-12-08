"use client";

import { create } from 'zustand';
import { SearchResult } from './types';

interface SearchStore {
  results: SearchResult | null;
  setResults: (results: SearchResult | null) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  results: null,
  setResults: (results) => set({ results }),
}));