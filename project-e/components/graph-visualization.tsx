"use client";

import { useEffect, useRef, memo } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { GraphData } from '@/lib/types';
import { useTheme } from 'next-themes';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-muted">
      <p className="text-muted-foreground">Loading visualization...</p>
    </div>
  )
});

interface GraphVisualizationProps {
  data?: GraphData;
}

function GraphVisualizationComponent({ data }: GraphVisualizationProps) {
  const graphRef = useRef();
  const { theme } = useTheme();

  const getNodeColor = (node: any) => {
    const colors = {
      person: '#ff6b6b',
      organization: '#4ecdc4',
      location: '#45b7d1',
      concept: '#96ceb4',
      default: '#6c5ce7'
    };
    return colors[node.type] || colors.default;
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Knowledge Graph</h2>
      <div className="h-[600px] rounded-lg overflow-hidden">
        {data ? (
          <ForceGraph3D
            ref={graphRef}
            graphData={data}
            nodeColor={getNodeColor}
            nodeLabel={(node: any) => node.name}
            linkWidth={link => (link.strength || 1) * 2}
            backgroundColor={theme === 'dark' ? '#1a1a1a' : '#ffffff'}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">
              Search to generate a knowledge graph
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export const GraphVisualization = memo(GraphVisualizationComponent);