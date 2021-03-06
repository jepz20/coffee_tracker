import * as api from '../api';
import { firebaseDb } from '../utils/firebase';
import { pad } from '../utils/numbers';

//NOTIFICATIONS actions

export const setNotificationPermission = () => ({
  type: 'SET_NOTIFICATION_PERMISSIONS',
});

//PROPERTIES ACTIONS
export const setActiveTab = activeTab => ({
  type: 'SET_ACTIVE_TAB',
  activeTab,
});

export const setActiveTabFromRoute = route => ({
  type: 'SET_ACTIVE_TAB_FROM_ROUTE',
  route,
});

//EXPENSES
export const fetchExpensesCategories = id => {
  const expensesCategoriesRef =  firebaseDb.ref(`/categories`);
  return (
    dispatch => {
      expensesCategoriesRef.on('value', snapshot => {
        dispatch({
          type: 'SET_EXPENSES_CATEGORIES',
          expensesCategories: snapshot.val(),
        });
      });
    }
  );
};

export const fetchExpensesListByPropertyId = id => {
  const expensesListRef =  firebaseDb.ref(`/properties/${id}/expenses`);
  return (
    dispatch => {
      expensesListRef.on('value', snapshot => {
        dispatch({
          type: 'SET_EXPENSES_LIST',
          expensesList: snapshot.val(),
        });
      });
    }
  );
};

export const fetchExpenseById = (propertyId, expenseId) => {
  const expenseRef =  firebaseDb.ref(`/properties/${propertyId}/expenses/${expenseId}`);
  return (
    dispatch => {
      expenseRef.on('value', snapshot => {
        dispatch({
          type: 'SET_EXPENSE_DETAIL',
          expenseDetail: snapshot.val(),
        });
      });
    }
  );
};

export const saveExpenses = (propertyId, expenses) => (
  dispatch => {
    const baseRef = `/properties/${propertyId}`;
    const propertyRef = firebaseDb.ref(`${baseRef}/expenses`);
    const { aggregatedCategories, aggregatedSubProperties } = expenses;

    propertyRef.push(expenses);
    Object.keys(aggregatedSubProperties).forEach(key => {
      const subsRef = firebaseDb.ref(`${baseRef}/map/coordinates/coords/${key}/info/totalExpenses`);
      subsRef.transaction(function (currentValue) {
        return (currentValue || 0) + aggregatedSubProperties[key];
      });
    });

    Object.keys(aggregatedCategories).forEach(key => {
      const subsRef = firebaseDb.ref(`${baseRef}/categories/${key}/totalExpenses`);
      subsRef.transaction(function (currentValue) {
        return (currentValue || 0) + aggregatedCategories[key];
      });
    });
    const expenseDate = new Date(expenses.expensesDate * 1000);
    const monthYear = pad(expenseDate.getMonth() + 1, 2) + expenseDate.getFullYear();
    const subsRef = firebaseDb.ref(`${baseRef}/expensesByMonth/${monthYear}`);
    subsRef.transaction(function (currentValue) {
      if (currentValue) {
        if (currentValue.totalExpenses) {
          currentValue.totalExpenses = currentValue.totalExpenses + expenses.total;
        } else {
          currentValue.totalExpenses = expenses.total;
        }

        return (currentValue);
      } else {
        return {
          month: expenseDate.getMonth() + 1,
          year: expenseDate.getFullYear(),
          totalExpenses: expenses.total,
        };
      }
    });
  }
);

// EVENTS ACTIONS
export const fetchEventsListByPropertyId = id => {
  const expensesListRef =  firebaseDb.ref(`/properties/${id}/events`);
  return (
    dispatch => {
      expensesListRef.on('value', snapshot => {
        dispatch({
          type: 'SET_EVENTS_LIST',
          expensesList: snapshot.val(),
        });
      });
    }
  );
};

export const saveEvent = (propertyId, event) => (
  dispatch => {
    const baseRef = `/properties/${propertyId}`;
    const eventRef = firebaseDb.ref(`${baseRef}/events`);

    eventRef.push(event);
    const lastRef = firebaseDb.ref(
      `${baseRef}/map/coordinates/coords/${event.eventsSubproperty}/info/lastEventAdded`
    );

    lastRef.set(event);
  }
);

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

export const setMapDetail = mapDetails => ({
  type: 'SET_MAP_DETAIL',
  mapDetails,
});

export const fetchMapDetailById = id => {
  const mapRef =  firebaseDb.ref(`/properties/${id}/map`);
  return (
    dispatch => {
      mapRef.on('value', snapshot => {
        dispatch({
          type: 'SET_MAP_DETAIL',
          mapDetails: snapshot.val(),
        });
      });
    }
  );
};

//PROPERTIES
export const fetchAllProperties = id => {
  const propertiesRef =  firebaseDb.ref(`/properties`);
  return (
    dispatch => {
      propertiesRef.on('value', snapshot => {
        dispatch({
          type: 'SET_ALL_PROPERTIES',
          allProperties: snapshot.val(),
        });
      });
    }
  );
};

export const setPropertyDetail = propertyDetail => ({
  type: 'SET_PROPERTY_DETAIL',
  propertyDetail,
});

export const fetchPropertyById = id => {
  const propertyRef = firebaseDb.ref(`/properties/${id}`);
  return (
    dispatch => {
      propertyRef.on('value', snapshot => {
        dispatch(setPropertyDetail(snapshot.val()));
      });
    }
  );
};

//NEWS ACTIONS

export const fetchtNewestNews = (limitTo=1) => {
  const newsRef =  firebaseDb.ref(`/news`);
  return (
    dispatch => {
      newsRef.orderByKey()
      .limitToLast(limitTo)
      .on('child_added', (childSnapshot, prevChildKey) => {
        dispatch({
          type: 'SEND_NOTIFICATION_NEWS',
          newsItem: childSnapshot.val(),
          newsKey: childSnapshot.key,
        });
      });
    }
  );
};

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

export const fetchNewsById = id => {
  const newsRef =  firebaseDb.ref(`/news/${id}`);
  return (
    dispatch => {
      newsRef.on('value', snapshot => {
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
