import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const n8nUrl = process.env.N8N_INGEST_WEBHOOK;
  if (!n8nUrl) {
    return NextResponse.json({ error: 'N8N ingest URL not configured' }, { status: 500 });
  }

  try {
    const n8nFormData = new FormData();
    n8nFormData.append('data', file);

    const res = await fetch(n8nUrl, {
      method: 'POST',
      body: n8nFormData,
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('N8N Ingest Error:', text);
        return NextResponse.json({ error: 'Failed to ingest document' }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ingest Proxy Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
