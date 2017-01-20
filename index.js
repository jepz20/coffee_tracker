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
import Main from './components/Main';
import Content from './components/Content';
import News from './components/News';
import Authentication from './components/Authentication';
import NewsLanding from './components/NewsLanding';
import AddBudget from './components/AddBudget';
import PropertiesList from './components/PropertiesList';
import PropertiesActions from './components/PropertiesActions';
import Error404 from './components/404';
import WebFontLoader from 'webfontloader';
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6CC8C1',
    accent1Color: brown700,
  },
  appBar: {
    height: 48,
  },
});

import 'normalize.css';
import './node_modules/font-awesome/css/font-awesome.min.css';
import './css/main.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={ history }>
        <Route component={ App }>
          <Route component={ Main }>
            <Route path='/' component={ News } />
            <Route path='/properties/:propertyId/budget/addexpenses' component={ AddBudget } />
            <Route path='/properties' component={ PropertiesList }>
            </Route>
            <Route path='/properties/:propertyId' component={ PropertiesActions } />
            <Route path='/properties/:propertyId/:action' component={ PropertiesActions } />
            <Route path='/news' component={ News } />
            <Route path='/news/:newsId' component={ NewsLanding } />
          </Route>
          <Route path='/login' component={ Authentication } />
          <Route path="*" component={Error404} status={404}/>
          <Route path="/404" component={Error404} status={404}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
