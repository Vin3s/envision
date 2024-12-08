import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { queryPerplexity } from '@/lib/perplexity';
import { logger } from '@/lib/logger';

if (!process.env.PERPLEXITY_API_KEY) {
  throw new Error('Missing PERPLEXITY_API_KEY environment variable');
}

export async function POST(request: Request) {
  logger.info('Search API route called');
  
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string') {
      logger.error('Invalid query parameter', { query });
      return NextResponse.json(
        { error: 'Invalid query parameter' },
        { status: 400 }
      );
    }

    logger.info('Processing search query', { query });

    // Query Perplexity API
    const perplexityResponse = await queryPerplexity(
      query,
      process.env.PERPLEXITY_API_KEY
    );

    const response = {
      query,
      results: perplexityResponse.choices[0].message.content,
      timestamp: new Date(),
    };

    // Store search results in MongoDB
    const client = await clientPromise;
    const db = client.db("knowledge_graph");
    await db.collection("searches").insertOne(response);

    logger.info('Search completed successfully');
    return NextResponse.json(response);
  } catch (error) {
    logger.error('Search error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: 'Failed to process search' },
      { status: 500 }
    );
  }
}