import { firestore } from "@/lib/firebase";
import { doc, setDoc, collection, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
   if (req.method === 'PUT') {
     try {
       const playerId = req.nextUrl.searchParams.get(['playerId']);
       const playerData = await req.json();
       const playerRef = doc(firestore, "players", playerId)

       await updateDoc(playerRef, {
         name: playerData.name,
         lacks: playerData.lacks.toString(),
         userId: playerData.userId
       });
  
       // Send success response
       res.json({ message: 'Player updated successfully.' });
     } catch (error) {
       // Handle error
       console.error(error);
       res.status(500).json({ error: 'Error updating player.' });
     }
   } else {
     // Handle any other HTTP method
     res.setHeader('Allow', ['PUT']);
     res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}

export const runtime = 'edge';