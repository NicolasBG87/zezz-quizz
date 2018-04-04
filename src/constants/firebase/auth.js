import { auth } from './firebase';

// Register
export const doCreateUserWithEmailAndPassword = (email, password) => 
  auth.createUserWithEmailAndPassword(email, password);

// Login
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Logout
export const doSignOut = () =>
  auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);