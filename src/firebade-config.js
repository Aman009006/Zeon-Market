// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// // import * as firebase from 'firebase';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAq1LhUX9n4ONZApFfnwKurDT-jPqb4L-s",
//   authDomain: "zeon-react-auth-hard.firebaseapp.com",
//   projectId: "zeon-react-auth-hard",
//   storageBucket: "zeon-react-auth-hard.appspot.com",
//   messagingSenderId: "314834285319",
//   appId: "1:314834285319:web:6a34ba2a3ffa1a1b018ba2",
//   measurementId: "G-BFQ12C887E"
// };

// // Initialize Firebase

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAgx_2REwtnhEHkmdScOxKOqTlgZH2b_HY",
  authDomain: "zeon-4cb57.firebaseapp.com",
  projectId: "zeon-4cb57",
  storageBucket: "zeon-4cb57.appspot.com",
  messagingSenderId: "655619886756",
  appId: "1:655619886756:web:5da9855b3b21f797de6031"
});

export const auth = getAuth()
export const firestore = getFirestore(firebaseApp)
console.log(firestore);


