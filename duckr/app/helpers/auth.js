import { ref, firebaseAuth } from 'config/constants'
import * as firebase from 'firebase'

export default function auth() {
  return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function checkIfAuthed(isAuthed) {
  // Ignore firebase
  return isAuthed === true;
}

export function logout() {
  return firebaseAuth().signOut()
}

export function saveUser(user) {
  return ref
    .child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}