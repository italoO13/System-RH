import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcJGUPfLWJ638mX2kmpd7ViCVhMFFSwbU",
  authDomain: "crud1-4d41d.firebaseapp.com",
  databaseURL: "https://crud1-4d41d-default-rtdb.firebaseio.com",
  projectId: "crud1-4d41d",
  storageBucket: "crud1-4d41d.appspot.com",
  messagingSenderId: "453726275250",
  appId: "1:453726275250:web:a95b0edb5ba361aab2abab"
};

// Initialize Firebase
export const fire = initializeApp(firebaseConfig);

export const db = getFirestore(fire);