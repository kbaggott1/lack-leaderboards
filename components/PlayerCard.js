import styles from './PlayerCard.module.css';

export default function PlayerCard({player, claimCard=false}) {
  return (
      <div className={styles.card}>
        <div className={styles.name}>{player.name}</div>
        {claimCard ?

          player.userId == "" ? 
          <button>Claim</button>
          :
          <button disabled={true}>Claimed</button>
        
        :
        <div className={styles.lacks}>Lacks: <b>{player.lacks}</b></div>
      }
      </div>
    );
}