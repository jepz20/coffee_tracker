import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAKQhelQEpPlTs6sVMQbxkI0n6VNPhHA4I',
  authDomain: 'coffeet-2a81b.firebaseapp.com',
  databaseURL: 'https://coffeet-2a81b.firebaseio.com',
  storageBucket: 'coffeet-2a81b.appspot.com',
  messagingSenderId: '55340719196',
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
