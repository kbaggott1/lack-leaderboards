import Head from 'next/head';
import { useState, useEffect } from 'react';
import PlayerCard from '@/components/PlayerCard.js';
import CountDownTimer from '@/components/CountDownTimer';

export default function Home() {
  const [players, setPlayers] = useState(null); // Store players data

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPlayers(data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Head>
        <title>Lack Leaderboards</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <div className='leaderboards-container'>
        <div className='title-container'>
          <h1>Lack Leaderboards</h1>
          <CountDownTimer/>
        </div>
        <hr></hr>
        {players ? players.length > 0 ? (
          <div className='players-container'>
            {players.map(player => (
                <PlayerCard key={player.id} player={player}></PlayerCard>
            ))}
          </div>
        ) : <p>Could not get players.</p> : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}