// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoS3vRgsviH9jTXL1CnODTX6yPGxc5wJI",
  authDomain: "ulan-solohackaton.firebaseapp.com",
  projectId: "ulan-solohackaton",
  storageBucket: "ulan-solohackaton.appspot.com",
  messagingSenderId: "594959374730",
  appId: "1:594959374730:web:d3cef1033d434499a19073",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
