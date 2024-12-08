import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("knowledge_graph");
    
    const searches = await db.collection("searches")
      .find({})
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json(searches);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search history' },
      { status: 500 }
    );
  }
}