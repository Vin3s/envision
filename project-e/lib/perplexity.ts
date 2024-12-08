import { PerplexityResponse } from './types';
import { config } from './config';
import { logger } from './logger';

export async function queryPerplexity(query: string, apiKey: string): Promise<PerplexityResponse> {
  logger.info('Initiating Perplexity API request', { query });
  
  try {
    const response = await fetch(config.api.perplexity.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: config.api.perplexity.model,
        messages: [
          {
            role: 'system',
            content: config.api.perplexity.systemPrompt
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: config.api.perplexity.maxTokens,
        temperature: config.api.perplexity.temperature
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.error('Perplexity API error', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData.error?.message || 'Perplexity API request failed');
    }

    const data = await response.json();
    logger.info('Perplexity API response received successfully');

    return data;
  } catch (error) {
    logger.error('Perplexity API call failed', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      query 
    });
    throw error;
  }
}