import { firebaseAuth, googleProvider } from '../utils/firebase.js';

export const createNewUser = (email, password, name) => (
  firebaseAuth.createUserWithEmailAndPassword(email, password)
  .then(response => {
    const user = firebaseAuth.currentUser;
    user.updateProfile({
      displayName: name,
    });
    return { status: 'success', response };
  })
  .catch(error => ({ status: 'error', error }))
);

export const signInWithEmail = (email, password) => (
  firebaseAuth.signInWithEmailAndPassword(email, password)
  .then(response => ({ status: 'success', response }))
  .catch(error => ({ status: 'error', error }))
);

export const signInWithGoogle = () => (
  firebaseAuth.signInWithRedirect(googleProvider)
  .then(response => ({ status: 'success', response }))
  .catch(error => ({ status: 'error', error }))
);

export const logout = () => (
  firebaseAuth.signOut()
);
