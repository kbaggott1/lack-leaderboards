import styles from './PlayerCard.module.css';
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function PlayerCard({player}) {
  const {user, setUser} = useContext(UserContext);

  return (
      <div className={styles.card}>
        <button className={styles.cardButton} onClick={console.log("decrement")}>-</button>
        <div>
          <div className={styles.name}>{player.name}</div>
          <div className={styles.lacks}>Lacks: <b>{player.lacks}</b></div>
        </div>
        <button className={styles.cardButton} onClick={console.log("increment")}>+</button>
      </div>
    );
}