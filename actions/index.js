import * as api from '../api';

export const setCreatedUser = userInfo => ({
  type: 'SET_CREATED_USER',
  userInfo,
});

export const doLogin = userInfo => ({
  type: 'DO_LOGIN',
  userInfo,
});

export const toggleShowLogin = () => ({
  type: 'TOGGLE_SHOW_LOGIN',
});

export const setUserInfo = userInfo => ({
  type: 'SET_USER_INFO',
  userInfo,
});

export const setLastRoute = route => ({
  type: 'SET_LAST_ROUTE',
  route,
});

export const createNewUser = (email, password, name) =>
  api.createNewUser(email, password, name)
  .then(response => setCreatedUser(response));

export const signInWithEmail = (email, password) =>
    api.signInWithEmail(email, password)
    .then(response => doLogin(response));

export const signInWithGoogle = () =>
    api.signInWithGoogle()
    .then(response => doLogin(response));

export const logout = () =>
    api.logout()
    .then(() => setUserInfo({ logged: 0 }));
