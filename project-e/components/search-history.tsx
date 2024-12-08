"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Clock, Search } from 'lucide-react';
import { SearchResult } from '@/lib/types';
import { fetchSearchHistory } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

interface SearchHistoryProps {
  onSelectSearch: (result: SearchResult) => void;
}

export function SearchHistory({ onSelectSearch }: SearchHistoryProps) {
  const [history, setHistory] = useState<SearchResult[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const data = await fetchSearchHistory();
      setHistory(data);
    } catch (error) {
      toast({
        title: "Failed to load history",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Search History</h3>
      </div>
      <ScrollArea className="h-[300px]">
        {history.map((result) => (
          <div
            key={result.id}
            className="p-3 hover:bg-muted rounded-lg cursor-pointer mb-2"
            onClick={() => onSelectSearch(result)}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{result.query}</p>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(result.timestamp).toLocaleDateString()}
            </p>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
}