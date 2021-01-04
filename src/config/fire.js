  
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDBkHD79bLSX3r8kzB3KHCQNjedPgp6cww",
  authDomain: "smitteweb-88f45.firebaseapp.com",
  projectId: "smitteweb-88f45",
  storageBucket: "smitteweb-88f45.appspot.com",
  messagingSenderId: "917523471437",
  appId: "1:917523471437:web:70bc2fb8a6978ff21b9004"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const fire = firebase;

export default fire;