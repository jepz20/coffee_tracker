import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import login from './login';
import header from './header';
import news from './news';
import map from './map';
import newsLanding from './newsLanding';
import routeHistory from './routeHistory';
import areaDetail from './areaDetail';
import propertiesList from './propertiesList';
import propertiesActions from './propertiesActions';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  user,
  login,
  header,
  news,
  map,
  propertiesList,
  newsLanding,
  routeHistory,
  areaDetail,
  propertiesActions,
});
