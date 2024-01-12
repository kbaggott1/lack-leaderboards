import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEH-jsHEfltgMJNLB6cOOgHFJ3LTTC7I4",
    authDomain: "lack-counter.firebaseapp.com",
    projectId: "lack-counter",
    storageBucket: "lack-counter.appspot.com",
    messagingSenderId: "18327074042",
    appId: "1:18327074042:web:22bb48e8b71fedac844543",
    measurementId: "G-DRPXZ0TKR2"
  };


  const app = initializeApp(firebaseConfig);
  console.log(app)
  const firestore = getFirestore(app);
  console.log(firestore)
export { firestore };