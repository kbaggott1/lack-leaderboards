import { firestore } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore/lite";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      try {
        //console.log(req.nextUrl.searchParams.get(['playerId']))
        const playerId = req.nextUrl.searchParams.get(['playerId']);
        const playerData = await req.json();
        // Update the player in Firestore
        const playerRef = doc(firestore, "players", playerId)

        await setDoc(playerRef, {
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
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
   }

   export const runtime = 'edge';