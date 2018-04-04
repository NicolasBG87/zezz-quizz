import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCRdfZUmeI038GJWQXf0i6bs539QMcO_2k",
  authDomain: "quiz-23-3-2018.firebaseapp.com",
  databaseURL: "https://quiz-23-3-2018.firebaseio.com",
  projectId: "quiz-23-3-2018",
  storageBucket: "quiz-23-3-2018.appspot.com",
  messagingSenderId: "891887275030"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};