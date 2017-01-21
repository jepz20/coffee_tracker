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
import property from './property';
import expensesCategories from './expensesCategories';
import expensesList from './expensesList';
import eventsList from './eventsList';
import eventTypes from './eventTypes';
import eventFrequencies from './eventFrequencies';
import expenseLanding from './expenseLanding';

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
  property,
  expensesCategories,
  expensesList,
  eventsList,
  eventFrequencies,
  eventTypes,
  expenseLanding,
});
