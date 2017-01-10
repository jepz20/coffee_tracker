import App from './components/App';
import configureStore from './store/configureStore';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueGrey500, amber500 } from 'material-ui/styles/colors';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainSection from './components/Main.js';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: amber500,
    accent1Color: blueGrey500,
  },
  appBar: {
    height: 50,
  },
});

import 'normalize.css';
import './node_modules/font-awesome/css/font-awesome.min.css';
import './css/main.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={ history }>
        <Route component={ App }>
        <Route path="/" component={ MainSection }>
        </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
