import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchatapp-86a91.firebaseapp.com",
    projectId: "reactchatapp-86a91",
    storageBucket: "reactchatapp-86a91.appspot.com",
    messagingSenderId: "573417685709",
    appId: "1:573417685709:web:54579ed0c74b77d649df84"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)