import Head from 'next/head';
import { useState, useEffect } from 'react';
import PlayerCard from '@/components/PlayerCard.js';
import CountDownTimer from '@/components/CountDownTimer';
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import {auth, firestore} from '@/lib/firebase.js'
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore/lite';

export default function Home() {
  const [players, setPlayers] = useState(null); // Store players data
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // Fetch data when the component mounts
    console.log(user)
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

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   const fetchPlayers = async () => {
  //     try {
  //       const response = await fetch('/api/players');
  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setPlayers(data); // Update state with fetched data
  //     } catch (error) {
  //       console.error("Failed to fetch players:", error);
  //     }
  //   };
   
  //   fetchPlayers(); // Initial fetch
   
  //   // Use Firestore's onSnapshot method to listen for real-time updates
  //   const unsubscribe = onSnapshot(collection(firestore, "players"), (snapshot) => {
  //     const updatedPlayers = [];
  //     snapshot.forEach((doc) => {
  //       updatedPlayers.push({ id: doc.id, ...doc.data() });
  //     });
  //     setPlayers(updatedPlayers);
  //   });
   
  //   // Cleanup function to clear the listener when the component unmounts
  //   return () => unsubscribe();
  //  }, []); // Empty dependency array ensures this runs once on mount

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.reload();
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
   };   

  return (
    <>
      <Head>
        <title>Lack Leaderboards</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <div className='nav-computer'>
        {
          !user ? 
          <a onClick={() => {router.push('/login')}}>Login</a>
          :
          <a onClick={handleSignOut}>Logout</a>

        }
      </div>
      <div className='leaderboards-container'>
        <div className='title-container'>
          <h1>Lack Leaderboards</h1>
          <CountDownTimer />
        </div>
        <hr></hr>
        {players ? players.length > 0 ? (
          <div className='players-container'>
            {players.sort((a, b) => Number(b.lacks) - Number(a.lacks)).map(player => (
              <PlayerCard key={player.id} player={player}></PlayerCard>
            ))}
          </div>
        ) : <p>Could not get players.</p> : (
          <p>Loading...</p>
        )}
      </div>
      <div className='nav-phone'>
        {
          !user ? 
          <a onClick={() => {router.push('/login')}}>Login</a>
          :
          <a onClick={handleSignOut}>Logout</a>

        }
      </div>
    </>
  );
}