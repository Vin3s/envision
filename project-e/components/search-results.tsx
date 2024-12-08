"use client";

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearch } from '@/lib/context/search-context';

export function SearchResults() {
  const { results } = useSearch();

  if (!results) {
    return (
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
        <div className="text-muted-foreground">
          Enter a search query above to see results
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      <div className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Query</p>
          <p className="text-lg">{results.query}</p>
        </div>
        <ScrollArea className="h-[300px] rounded-lg border p-4">
          <div className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Response</p>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {results.results}
            </div>
          </div>
        </ScrollArea>
        <div className="text-sm text-muted-foreground">
          Searched at: {new Date(results.timestamp).toLocaleString()}
        </div>
      </div>
    </Card>
  );
}