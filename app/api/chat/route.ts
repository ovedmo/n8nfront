import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { question, history } = body;

  const n8nUrl = process.env.N8N_CHAT_WEBHOOK;
  if (!n8nUrl) {
    return NextResponse.json({ error: 'N8N chat URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }),
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to get answer' }, { status: res.status });
    }

    const data = await res.json();
    
    // Attempt to resolve the answer from common n8n return fields
    const answer = data.text || data.output || data.answer || JSON.stringify(data);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Chat Proxy Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
