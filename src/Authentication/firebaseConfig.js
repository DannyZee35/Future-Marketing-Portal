// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBhQUq2dzrsrrv71DOKxOp4Y8DtB13V6qM",
  authDomain: "projectsecond-56fdf.firebaseapp.com",
  projectId: "projectsecond-56fdf",
  storageBucket: "projectsecond-56fdf.appspot.com",
  messagingSenderId: "398463375803",
  appId: "1:398463375803:web:88db35971df28c595c8c9e",
  measurementId: "G-V0MYDQSVTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const db=getFirestore();
