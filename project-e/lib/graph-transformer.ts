import { SearchResult, GraphData, Entity, Relationship } from './types';

export function transformToGraphData(searchResults: SearchResult[]): GraphData {
  const nodes = new Map();
  const links = new Map();

  searchResults.forEach(result => {
    result.entities.forEach(entity => {
      if (!nodes.has(entity.id)) {
        nodes.set(entity.id, {
          id: entity.id,
          name: entity.name,
          type: entity.type,
          val: entity.confidence * 10
        });
      }

      entity.relationships.forEach(rel => {
        const linkId = `${rel.source}-${rel.target}`;
        if (!links.has(linkId)) {
          links.set(linkId, {
            source: rel.source,
            target: rel.target,
            type: rel.type,
            strength: rel.strength
          });
        }
      });
    });
  });

  return {
    nodes: Array.from(nodes.values()),
    links: Array.from(links.values())
  };
}