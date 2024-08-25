
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIoIVTLVaitvL_axaCBjTwB9kFgXt3mCA",
  authDomain: "countdownapp-c719f.firebaseapp.com",
  projectId: "countdownapp-c719f",
  storageBucket: "countdownapp-c719f.appspot.com",
  messagingSenderId: "344440139351",
  appId: "1:344440139351:web:e2541570c73c113f26bd12"
};

// Initialize Firebasea
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { app, auth };