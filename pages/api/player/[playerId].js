import { firestore } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore/lite";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      try {
        const { playerId } = req.query;
        const playerData = req.body;
        // Update the player in Firestore
        const playerRef = doc(firestore, "players", playerId)
        await setDoc(playerRef, playerData);
   
        // Send success response
        res.status(200).json({ message: 'Player updated successfully.' });
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