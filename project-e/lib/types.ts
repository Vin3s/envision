export interface SearchResult {
  id: string;
  query: string;
  content: string;
  timestamp: Date;
  entities: Entity[];
}

export interface Entity {
  id: string;
  name: string;
  type: string;
  confidence: number;
  relationships: Relationship[];
}

export interface Relationship {
  source: string;
  target: string;
  type: string;
  strength: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface Node {
  id: string;
  name: string;
  type: string;
  val: number;
}

export interface Link {
  source: string;
  target: string;
  type: string;
  strength: number;
}

export interface PerplexityResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface APIError {
  error: {
    message: string;
    type?: string;
    code?: string;
    param?: string;
  };
}