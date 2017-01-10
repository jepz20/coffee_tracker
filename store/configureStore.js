import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  const middlewares = [promise, ReduxThunk];
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  };

  const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
