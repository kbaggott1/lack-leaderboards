// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "../../lib/firebase.js"
import { collection, getDocs } from "firebase/firestore/lite";

export default async function handler() {
  const logCollection = collection(firestore, 'logs')
  try {
    const querySnapshot = await getDocs(logCollection);
    const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return Response.json(logs.sort((a, b) => b.unix - a.unix))
  }
  catch(error) {
    console.error("Error fetching logs:", error);
    return Response.error({ error: error.message });
  }
}


export const runtime = 'edge';