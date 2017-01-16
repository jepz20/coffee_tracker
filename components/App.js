import React from 'react';
import Authentication from './Authentication.js';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import { firebaseAuth } from '../utils/firebase.js';
const mapStateToProps = (state) => ({
  routing: state.routing,
  user: state.user,
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { setUserInfo } = this.props;
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setUserInfo({ logged: 1, userInfo: user });
      } else {
        setUserInfo({ logged: 0, userInfo: {} });
      }
    });
  }

  render() {
    return (
      <div className="app">
        { this.props.children }
      </div>
    );
  }
}

App = connect(mapStateToProps, actions)(App);
export default App;
