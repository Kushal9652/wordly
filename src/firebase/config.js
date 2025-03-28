// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeVdGMD_G05EINYVjO46gPH6duBzfxKsU",
  authDomain: "writenode-800f1.firebaseapp.com",
  projectId: "writenode-800f1",
  storageBucket: "writenode-800f1.firebasestorage.app",
  messagingSenderId: "121984350682",
  appId: "1:121984350682:web:59bdb937883320b67c68e3",
  measurementId: "G-N73B2BH6J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Commented out since it's unused

// Initialize Firebase services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export Firebase services
export { auth, provider, db };