import * as api from '../api';

export const setCreatedUser = createdUserInfo => ({
  type: 'SET_CREATED_USER',
  createdUserInfo,
});

export const setUserCredential = userInfo => ({
  type: 'SET_USER_CREDENTIAL',
  userInfo,
});

export const toggleShowLogin = () => ({
  type: 'TOGGLE_SHOW_LOGIN',
});

export const createNewUser = (email, password) =>
  api.createNewUser(email, password)
  .then(response => setCreatedUser(response));

export const signInWithEmail = (email, password) =>
    api.signInWithEmail(email, password)
    .then(response => setUserCredential(response));

export const signInWithGoogle = () =>
    api.signInWithGoogle()
    .then(response => setUserCredential(response));
