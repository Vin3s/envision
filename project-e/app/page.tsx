import dynamic from 'next/dynamic';
import { SearchHero } from '@/components/search-hero';
import { SearchResults } from '@/components/search-results';

const GraphVisualization = dynamic(
  () => import('@/components/graph-visualization').then(mod => ({ default: mod.GraphVisualization })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SearchHero />
      <div className="container mx-auto px-4 py-8">
        <SearchResults />
        <GraphVisualization />
      </div>
    </main>
  );
}