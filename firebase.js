// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtJa2m-w0G0ZGK-0w4R23tplyfUrWxWLM",
  authDomain: "sporty-e9707.firebaseapp.com",
  projectId: "sporty-e9707",
  storageBucket: "sporty-e9707.appspot.com",
  messagingSenderId: "359382585943",
  appId: "1:359382585943:web:9094e8a8db77bc14e50912",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
// export const db = getFirestore(app);
export default app;
