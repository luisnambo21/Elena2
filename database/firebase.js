import firebase from "firebase";
import  "firebase/firestore";   

var firebaseConfig = {
  apiKey: "AIzaSyDm9udBb7yiXTA-Jo0Ev_op85NmmakOT28",
  authDomain: "tarea1-fbb66.firebaseapp.com",
  projectId: "tarea1-fbb66",
  storageBucket: "tarea1-fbb66.appspot.com",
  messagingSenderId: "1071813149127",
  appId: "1:1071813149127:web:5d838b9740ed439db299e2",
  measurementId: "G-7F7F74CVFL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
const db = firebase.firestore();

export default {
    firebase,
    db
};

