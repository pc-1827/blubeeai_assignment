import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Check if we have valid Firebase config
const hasValidConfig = () => {
  return process.env.FIREBASE_API_KEY && process.env.FIREBASE_API_KEY.length > 0;
};

// Firebase Config
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "demo-key-for-development-only",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "demo-app.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "demo-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "demo-app.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.FIREBASE_APP_ID || "1:123456789:web:abcdef123456789",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-ABCDEF123",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
