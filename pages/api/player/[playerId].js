import { firestore } from "@/lib/firebase";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore/lite";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      try {
        //console.log(req.nextUrl.searchParams.get(['playerId']))
        const playerId = req.nextUrl.searchParams.get(['playerId']);
        const data = await req.json();

        const playerData = data['target']
        const user = data['user']
        // Update the player in Firestore
        const playerRef = doc(firestore, "players", playerId)

        const date = new Date();
        const formattedTimestamp = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;
        const log = {
          target: playerData.name,
          edittedBy: user.email,
          timestamp: formattedTimestamp,
          unix: Date.now(),
          newCount: playerData.lacks.toString()
        }

        await addDoc(collection(firestore, "logs"), log)
        // console.log(user)
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
    Response.error({ error: 'Something went wrong' })
   }
   export const runtime = 'edge';