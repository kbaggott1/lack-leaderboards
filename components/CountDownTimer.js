import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TimeBlock from './TimeBlock';
import styles from './CountDownTimer.module.css';

export default function CountDownTimer() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const targetDate = new Date('2025-01-01T00:00:00'); // Set your target date/time

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft("over");
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({days: days, hours: hours, minutes: minutes, seconds: seconds});
      }
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // ... rest of your component

  return (
    <>
        { timeLeft ? 
          timeLeft == "over" ? <h2>Game Over!</h2> :
            <div className={styles.countdowntimer}>
                <TimeBlock time={timeLeft.days} label='Days'></TimeBlock>
                <TimeBlock time={timeLeft.hours} label='Hours'></TimeBlock>
                <TimeBlock time={timeLeft.minutes} label='Minutes'></TimeBlock>
                <TimeBlock time={timeLeft.seconds} label='Seconds'></TimeBlock>
            </div>
            :
            <h2>Loading...</h2>
        }
        
    </>
  );
}
