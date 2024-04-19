 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "react-auth-practice-01.firebaseapp.com",
  projectId: "react-auth-practice-01",
  storageBucket: "react-auth-practice-01.appspot.com",
  messagingSenderId: "664613580691",
  appId: "1:664613580691:web:bbf5364218766f4ec60266",
  measurementId: "G-C9STT5SYH0"
};

 
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;