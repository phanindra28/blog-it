import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCev3aHHvTKatUS2gN3xM2DHA9_7Bw_JSQ",
  authDomain: "blogs-59f75.firebaseapp.com",
  projectId: "blogs-59f75",
  storageBucket: "blogs-59f75.firebasestorage.app",
  messagingSenderId: "917398258537",
  appId: "1:917398258537:web:280f283862240edc6cb3f8",
  measurementId: "G-YMY9SBMN14",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
