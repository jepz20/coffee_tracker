import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from './user.js';
import login from './login.js';
import header from './header.js';
import news from './news.js';
import map from './map.js';
import newsLanding from './newsLanding.js';
import routeHistory from './routeHistory.js';
import areaDetail from './areaDetail.js';
import mapsList from './mapsList.js';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  user,
  login,
  header,
  news,
  map,
  mapsList,
  newsLanding,
  routeHistory,
  areaDetail,
});
