import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login.js';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  login,
  form: formReducer,
});
