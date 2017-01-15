import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import routeHistory from './routeHistory.js';
import { reducer as formReducer } from 'redux-form';
import user from './user.js';
import login from './login.js';
import header from './header.js';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  login,
  header,
  user,
  routeHistory,
});
