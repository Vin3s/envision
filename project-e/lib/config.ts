export const config = {
  api: {
    perplexity: {
      url: 'https://api.perplexity.ai/chat/completions',
      model: 'llama-3.1-sonar-small-128k-online',
      maxTokens: 4096, // Reduced to a safe limit
      temperature: 0.7,
      systemPrompt: 'You are a helpful assistant that provides accurate and concise information, focusing on extracting key entities and their relationships.'
    },
    mongodb: {
      dbName: 'knowledge_graph',
      collections: {
        searches: 'searches'
      }
    }
  }
} as const;