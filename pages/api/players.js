// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "../../lib/firebase.js"
import { collection, getDocs } from "firebase/firestore";
export default async function handler() {
  const playerCollection = collection(firestore, 'players')

  try {
    const querySnapshot = await getDocs(playerCollection);
    const players = querySnapshot.docs.map(doc => doc.data())
    return Response.json(players)
  }
  catch(error) {
    console.error("Error fetching players:", error);
    return Response.error({ error: error.message });
  }
}

export const runtime = 'edge';