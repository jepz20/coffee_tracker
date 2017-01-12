import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login.js';

export default combineReducers({
  routing: routerReducer,
  login,
});
