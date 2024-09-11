import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "caltrack-9365d.firebaseapp.com",
  databaseURL:
    "https://caltrack-9365d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "caltrack-9365d",
  storageBucket: "caltrack-9365d.appspot.com",
  messagingSenderId: "272476967393",
  appId: "1:272476967393:web:19473b63c1c3c74f4482a0",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);
