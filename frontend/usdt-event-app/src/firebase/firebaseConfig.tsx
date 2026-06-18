
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "*",
  authDomain: "usdt-event.firebaseapp.com",
  projectId: "usdt-event",
  storageBucket: "usdt-event.firebasestorage.app",
  messagingSenderId: "1059640446311",
  appId: "1:1059640446311:web:fbf9f56d78608131b0f3c2",
  measurementId: "G-DKCMZSJF28"
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);