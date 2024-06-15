import styles from './PlayerCard.module.css';
import { UserContext } from '@/context/UserContext';
import { useContext, useState } from 'react';

export default function PlayerCard({player}) {
  const {user, setUser} = useContext(UserContext);
  const [lacks, setLacks] = useState(player.lacks);

  const handleIncrement = (player) => {
    player.lacks = (Number(player.lacks) + 1).toString();
    setLacks(player.lacks);
    updatePlayer(player);
  }

  const handleDeccrement = (player) => {
    player.lacks = (Math.max(Number(player.lacks) - 1, 0)).toString();
    setLacks(player.lacks);
    updatePlayer(player);
  }

  const updatePlayer = async (player) => {
    try {
      const url = `/api/player/${player.id}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({target: player, user: user})
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  }

  return (
      <div className={styles.card}>
        {
          user && player.userId != user.uid && <button className={styles.cardButton} onClick={() => { handleDeccrement(player) }}>-</button>
        }
        <div>
          <div className={styles.name}>{player.name}</div>
          <div className={styles.lacks}>Lacks: <b>{lacks}</b></div>
        </div>
        {
          user && player.userId != user.uid && <button className={styles.cardButton} onClick={() => { handleIncrement(player) }}>+</button>
        }
      </div>
    );
}