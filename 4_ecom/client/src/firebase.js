import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAK25jwZuXVCYVYPYzlgjtEofOr9pdJ2LE",
    authDomain: "ecom-2aa63.firebaseapp.com",
    projectId: "ecom-2aa63",
    storageBucket: "ecom-2aa63.appspot.com",
    messagingSenderId: "282529697090",
    appId: "1:282529697090:web:ac497cf2e872d1b139ccdb"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth()
// export const googleAuthProvider = new firebase.auth.googleAuthProvider();
// start using firebase auth features. 