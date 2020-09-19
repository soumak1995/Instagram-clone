import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDRd_Zsqo8dfuarObaSeAUDLzEh2M8-2iI",
    authDomain: "instagram-clone-a5111.firebaseapp.com",
    databaseURL: "https://instagram-clone-a5111.firebaseio.com",
    projectId: "instagram-clone-a5111",
    storageBucket: "instagram-clone-a5111.appspot.com",
    messagingSenderId: "1046581283699",
    appId: "1:1046581283699:web:d487996eb9ab2223499306",
    measurementId: "G-T2S5BZNV4S"
  };
  const firebaseapp=firebase.initializeApp(firebaseConfig);
  const db=firebaseapp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  export {db,auth,storage}