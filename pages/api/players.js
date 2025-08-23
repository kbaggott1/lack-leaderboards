
// pages/api/players.js
export const runtime = 'edge';

export default async function handler() {
  try {
    const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // ok if reads are public
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/players?pageSize=1000&key=${API_KEY}`;

    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) {
      const text = await r.text();
      return new Response(JSON.stringify({ error: `HTTP ${r.status}: ${text}` }), { status: 500, headers: { 'content-type': 'application/json' }});
    }
    const data = await r.json();

    // Convert Firestore REST docs -> plain JS objects
    const players = (data.documents || []).map(doc => {
      const f = doc.fields || {};
      const get = v => v?.stringValue ?? v?.integerValue ?? v?.doubleValue ?? v?.booleanValue ?? null;
      return {
        id: doc.name.split('/').pop(),
        name: get(f.name),
        lacks: get(f.lacks),
        userId: get(f.userId),
      };
    });

    return new Response(JSON.stringify(players), { status: 200, headers: { 'content-type': 'application/json' }});
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message || err) }), { status: 500, headers: { 'content-type': 'application/json' }});
  }
}
