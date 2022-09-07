// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0Jz1WHMsHW3bUcr3TZvIm5-bel-5-ghk",
  authDomain: "futuremarketing-6deb5.firebaseapp.com",
  projectId: "futuremarketing-6deb5",
  storageBucket: "futuremarketing-6deb5.appspot.com",
  messagingSenderId: "170666124528",
  appId: "1:170666124528:web:337b069a6f4025d9108e35",
  measurementId: "G-LKWBH65P4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const db=getFirestore();
