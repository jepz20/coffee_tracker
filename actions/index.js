import * as api from '../api';
import { firebaseDb } from '../utils/firebase.js';

export const fetchFirstNews = (limitTo=5) => {
  const newsRef =  firebaseDb.ref(`/news`);
  return (
    dispatch => {
      newsRef.orderByKey()
      .limitToLast(limitTo)
      .on('child_added', (childSnapshot, prevChildKey) => {
        dispatch({
          type: 'SET_NEWS_FEED',
          newsItem: childSnapshot.val(),
          newsKey: childSnapshot.key,
        });
      });
    }
  );
};

export const fetchMoreNews = (lastQueryKey, limitTo=5) => {
  const newsRef =  firebaseDb.ref(`/news`);
  return (
    dispatch => {
      newsRef.orderByKey()
      .endAt(lastQueryKey)
      .limitToLast(limitTo)
      .on('child_added', (childSnapshot, prevChildKey) => {
        dispatch({
          type: 'SET_NEWS_FEED',
          newsItem: childSnapshot.val(),
          newsKey: childSnapshot.key,
        });
      });
    }
  );
};

export const setResetLastQuery = () => ({
  type: 'SET_RESET_LAST_QUERY',
});

export const setNewsFeed = newsFeed => ({
  type: 'SET_NEWS_FEED',
  newsItem,
  newsKey,
});

export const setCreatedUser = userInfo => ({
  type: 'SET_CREATED_USER',
  userInfo,
});

export const doLogin = userInfo => ({
  type: 'DO_LOGIN',
  userInfo,
});

export const setLoginScreen = () => ({
  type: 'SET_LOGIN_SCREEN',
});

export const setRegisterScreen = () => ({
  type: 'SET_REGISTER_SCREEN',
});

export const setUserInfo = userInfo => ({
  type: 'SET_USER_INFO',
  userInfo,
});

export const setLastRoute = route => ({
  type: 'SET_LAST_ROUTE',
  route,
});

export const setHeadersValues = values => ({
  type: 'SET_HEADER_VALUES',
  values,
});

export const toggleDrawerOpen = () => ({
  type: 'TOGGLE_DRAWER_OPEN',
});

export const closeDrawer = () => ({
  type: 'CLOSE_DRAWER',
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
    .then(() => setUserInfo({ logged: 0, userInfo: {} }));
