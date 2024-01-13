import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 useEffect(() => {
  const persistedUser = localStorage.getItem('user');
 
  if (persistedUser) {
    setUser(JSON.parse(persistedUser));    
  }
 
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (!user && currentUser) {
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else if (!currentUser) {
      localStorage.removeItem('user');
    }
   });
 
  // Cleanup subscription on unmount
  return () => unsubscribe();
  }, []);

 return (
   <UserContext.Provider value={{ user, setUser }}>
     {children}
   </UserContext.Provider>
 );
};
