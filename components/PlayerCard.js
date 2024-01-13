import styles from './PlayerCard.module.css';

export default function PlayerCard({player}) {
  return (
      <div className={styles.card}>
        <div className={styles.name}>{player.name}</div>
        <div className={styles.lacks}>Lacks: <b>{player.lacks}</b></div>
      
      </div>
    );
}