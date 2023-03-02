import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';



export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAaAqbOFo9ZWnYdoN7MRgQmC-o7_yiyL_A",
    authDomain: "chat-66cf2.firebaseapp.com",
    projectId: "chat-66cf2",
    storageBucket: "chat-66cf2.appspot.com",
    messagingSenderId: "1095733841783",
    appId: "1:1095733841783:web:459db582be5c1dccce1b72"
}).auth();


// facebook secret Keys:
// App ID: 930603285057176
// App secret: c35fbf1ff565d26c9836da81085eed57