"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatedBackground } from './animated-background';
import { performSearch } from '@/lib/actions';
import { useSearch } from '@/lib/context/search-context';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export function SearchHero() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setResults } = useSearch();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const results = await performSearch(query.trim());
      setResults(results);
      toast({
        title: "Search completed",
        description: "Results have been processed and saved.",
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-background to-secondary overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          envision
        </h1>
        <p className="text-lg md:text-xl mb-8 text-muted-foreground">
          Transform your searches into interactive knowledge graphs
        </p>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your search query..."
              className="h-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="lg" className="h-12" disabled={isLoading}>
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <Link
              href="https://www.perplexity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Perplexity
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}