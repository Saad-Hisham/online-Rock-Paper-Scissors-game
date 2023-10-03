// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBm5mkxarpeO8Ccg5BXjqXdrFpBl2aw4lE",
    authDomain: "chat-6148b.firebaseapp.com",
    projectId: "chat-6148b",
    storageBucket: "chat-6148b.appspot.com",
    messagingSenderId: "334517340710",
    appId: "1:334517340710:web:1431631bfb00d1e62bb4e7"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);