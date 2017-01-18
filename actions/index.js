import * as api from '../api';
import { firebaseDb } from '../utils/firebase.js';

//PROPERTIES ACTIONS

export const setActiveTab = activeTab => ({
  type: 'SET_ACTIVE_TAB',
  activeTab,
});

export const setActiveTabFromRoute = route => ({
  type: 'SET_ACTIVE_TAB_FROM_ROUTE',
  route,
});

//MAP ACTIONS
export const boundsChanged = (center, zoom, bounds) => ({
  type: 'BOUNDS_CHANGED',
  center,
  zoom,
  bounds,
});

export const hideAreaDetail = () => ({
  type: 'HIDE_AREA_DETAIL',
});

export const setActionDetail = info => ({
  type: 'SET_ACTION_DETAIL',
  info,
});

export const setMapDetail = (mapDetails) => ({
  type: 'SET_MAP_DETAIL',
  mapDetails,
});

export const fetchMapDetailById = (id) => {
  const newsRef =  firebaseDb.ref(`/properties/${id}/map`);
  return (
    dispatch => {
      newsRef.on('value', snapshot=> {
        dispatch({
          type: 'SET_MAP_DETAIL',
          mapDetails: snapshot.val(),
        });
      });
    }
  );
};

export const fetchAllProperties = (id) => {
  const newsRef =  firebaseDb.ref(`/properties`);
  return (
    dispatch => {
      newsRef.on('value', snapshot=> {
        dispatch({
          type: 'SET_ALL_PROPERTIES',
          allProperties: snapshot.val(),
        });
      });
    }
  );
};

//NEWS ACTIONS
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

export const fetchNewsById = (id) => {
  const newsRef =  firebaseDb.ref(`/news/${id}`);
  return (
    dispatch => {
      newsRef.on('value', snapshot=> {
        dispatch({
          type: 'RECEIVE_NEWS_LANDING_DETAIL',
          newsDetail: snapshot.val(),
        });
      });
    }
  );
};

export const receiveNewsLandingDetail = newsDetail => ({
  type: 'RECEIVE_NEWS_LANDING_DETAIL',
  newsDetail,
});

export const setResetLastQuery = () => ({
  type: 'SET_RESET_LAST_QUERY',
});

export const setNewsFeed = (newsItem, newsKey) => ({
  type: 'SET_NEWS_FEED',
  newsItem,
  newsKey,
});

export const setCreatedUser = userInfo => ({
  type: 'SET_CREATED_USER',
  userInfo,
});

//LOGIN ACTIONS
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

// ROUTE ACTIONS
export const setLastRoute = route => ({
  type: 'SET_LAST_ROUTE',
  route,
});

//HEADER ACTIONS
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
