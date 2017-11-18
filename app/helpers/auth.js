import { ref, firebaseAuth } from '../config/constants';

// Attempt to authorize via Firebase and Facebook
export function auth() {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider());
}

// Check application state if user has been authenticated
export function checkIfAuthed(store) {
  // TODO: If not authed in state, check Firebase/Facebook
  return store.getState().users.isAuthed;
}

export function logout() {
  return firebaseAuth().signOut();
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user);
}
