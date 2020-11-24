import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyCWFhUmplNw97RwyHkhWdeNyuT5jMNNY_U",
  authDomain: "homestay-cb6d7.firebaseapp.com",
  databaseURL: "https://homestay-cb6d7.firebaseio.com",
  projectId: "homestay-cb6d7",
  storageBucket: "homestay-cb6d7.appspot.com",
  messagingSenderId: "674511107399",
  appId: "1:674511107399:web:d968a4066935e096c5c862",
  measurementId: "G-QNV5TVP3S2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
// const projectStorage = firebase.storage();
// const firestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth };
