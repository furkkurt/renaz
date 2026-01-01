// Firebase configuration and initialization
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq_Piqr-BfKQjuuXI-NG-1_jKa4sz54Pg",
  authDomain: "renazteknik-82233.firebaseapp.com",
  projectId: "renazteknik-82233",
  storageBucket: "renazteknik-82233.firebasestorage.app",
  messagingSenderId: "446200856758",
  appId: "1:446200856758:web:0d324a3b825f57f9a26617",
  measurementId: "G-FV71EGL0JB"
};

// Initialize Firebase (avoid multiple initializations)
let app;
let db;

if (typeof window !== "undefined") {
  // Client-side only
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    // Initialize analytics only on client side
    try {
      getAnalytics(app);
    } catch (e) {
      // Analytics initialization error (might already be initialized)
      console.warn("Analytics initialization warning:", e);
    }
  } else {
    app = getApps()[0];
    db = getFirestore(app);
  }
} else {
  // Server-side: create minimal instances
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db };
export default app;

