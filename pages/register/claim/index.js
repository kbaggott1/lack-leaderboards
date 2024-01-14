import styles from './claim.module.css'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import PlayerCardClaim from '@/components/PlayerCardClaim';

export default function Claim() {
    const [players, setPlayers] = useState(null); // Store players data
    const {user, setUser} = useContext(UserContext);
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
      }, []);
    return (
        <div>
            {user ?
                <div className='players-container'>
                    {players && players.map(player => (
                        <PlayerCardClaim key={player.id} player={player} claimCard={true}></PlayerCardClaim>
                    ))}
                </div>
                :
                <p>You must be registered or logged in to claim a player</p>
            }
        </div>
    ) 
}