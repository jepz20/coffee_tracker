import App from './components/App';
import configureStore from './store/configureStore';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey50, brown700 } from 'material-ui/styles/colors';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main.js';
import Content from './components/Content.js';
import Map from './components/Map.js';
import News from './components/News.js';
import Authentication from './components/Authentication.js';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6CC8C1',
    accent1Color: grey50,
    accent2Color: brown700,
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
const NoMatch = () => (
  <div>No Existo</div>
);

render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={ history }>
        <Route component={ App }>
          <Route component={ Main }>
            <Route path='/' component={ Content } />
            <Route path='/map' component={ Map } />
            <Route path='/news' component={ News } />
          </Route>
          <Route path='/login' component={ Authentication } />
          <Route path="*" component={NoMatch} status={404}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
