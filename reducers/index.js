import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from './user.js';
import login from './login.js';
import header from './header.js';
import news from './news.js';
import newsLanding from './newsLanding.js';
import routeHistory from './routeHistory.js';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  user,
  login,
  header,
  news,
  newsLanding,
  routeHistory,
});
