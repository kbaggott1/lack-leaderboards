import { firestore } from "@/lib/firebase";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      try {
        //console.log(req.nextUrl.searchParams.get(['playerId']))
        const playerId = req.nextUrl.searchParams.get(['playerId']);
        const playerData = await req.json();
        // Update the player in Firestore
        const playerRef = doc(firestore, "players", playerId)

        await updateDoc(playerRef, {
          name: playerData.name,
          lacks: playerData.lacks.toString(),
          userId: playerData.userId
        });
   
        // Send success response
        Response.json({ message: 'Player updated successfully.' });
      } catch (error) {
        // Handle error
        console.error(error);
        Response.error({ error: 'Error updating player.' });
      }
    }
   }

   export const runtime = 'edge';