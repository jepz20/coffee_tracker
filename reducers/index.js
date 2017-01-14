import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login.js';
import routeHistory from './routeHistory.js';
import user from './user.js';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  login,
  user,
  routeHistory,
});
