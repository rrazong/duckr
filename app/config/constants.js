import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyD_MRCO32-c1mRSsijHNx3zQvGTm9XP8pc',
  authDomain: 'duckr-f723f.firebaseapp.com',
  databaseURL: 'https://duckr-f723f.firebaseio.com',
  projectId: 'duckr-f723f',
  storageBucket: 'duckr-f723f.appspot.com',
  messagingSenderId: '1001391107206',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
