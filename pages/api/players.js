// pages/api/players.js (or .ts)
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "../../lib/firebase.js";
import { collection, getDocs } from "firebase/firestore/lite";

export const runtime = 'edge'; // keep if you want Edge

export default async function handler() {
  try {
    const playerCollection = collection(firestore, 'players');
    const snap = await getDocs(playerCollection);
    const players = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(players), {
      status: 200,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  } catch (err) {
    // Log everything server-side
    console.error("Error fetching players:", err);

    // ❗ Return a JSON body so you can read it in the Network panel
    return new Response(JSON.stringify({
      error: String(err?.message || err),
      stack: err?.stack || null,   // remove in prod if you prefer
    }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
