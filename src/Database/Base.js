import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDxhj4wnX1vDR4RCgTJBD4PGkvgpa3tdjA",
  authDomain: "codeshopdata.firebaseapp.com",
  projectId: "codeshopdata",
  storageBucket: "codeshopdata.appspot.com",
  messagingSenderId: "797427632312",
  appId: "1:797427632312:web:12ebef49adc09156004c4d",
  measurementId: "G-8S90PSS39K",
});

export default app;
export const db = app.firestore();
export const storage = app.storage();
