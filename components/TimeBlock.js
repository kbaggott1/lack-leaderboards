import styles from './TimeBlock.module.css';

export default function TimeBlock({time, label}) {
    return (
        <div className={styles.container}>
            <div className={styles.time}>
                <h2>{time}</h2>
            </div>
            <div className={styles.label}>
                <h3>{label}</h3>
            </div>
        </div>
    )
}