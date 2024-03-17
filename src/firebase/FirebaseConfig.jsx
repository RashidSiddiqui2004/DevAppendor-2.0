 
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'; 
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx3v-QeUebNJ3QZ7Y9g2HW7sC2O47KiYo",
  authDomain: "devappendor.firebaseapp.com",
  projectId: "devappendor",
  storageBucket: "devappendor.appspot.com",
  messagingSenderId: "329530034347",
  appId: "1:329530034347:web:41a04546da59f1070d8fee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app); 
// Create a root reference
const storage = getStorage();

export {fireDB, auth, storage}