import styles from './PlayerCard.module.css';
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import { useRouter } from "next/router.js";

export default function PlayerCardClaim({player}) {
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();

  const claimAccount = async (player) => {
    try {
      const updatedPlayer = {
        ...player,
        userId: user.uid
      }
      const url = `/api/player/${player.id}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlayer)
      });

      router.push('/');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  }

  return (
      <div className={styles.card}>
        <div className={styles.name}>{player.name}</div>
        {
          player.userId == "" ? 
          <button onClick={() => claimAccount(player)}>Claim</button>
          :
          <button disabled={true}>Claimed</button>   
        }
      </div>
    );
}