import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDbBojWUhUJZZm70dzCExmQXYWSP5teq4w",
  authDomain: "watch-shop-370518.firebaseapp.com",
  projectId: "watch-shop-370518",
  storageBucket: "watch-shop-370518.appspot.com",
  messagingSenderId: "796926581362",
  appId: "1:796926581362:web:2823ae6f7add010e0e00eb",
  measurementId: "G-RBRWSZXVMJ",
});

// Firebase storage reference
export const storage = getStorage(app);
