import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import { firebaseAuth } from '../utils/firebase.js';

const mapStateToProps = (state) => ({
  routing: state.routing,
  user: state.user,
  notifications: state.notifications,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setNotificationPermission = this.setNotificationPermission.bind(this);
  }

  setNotificationPermission() {
    if (this.props.user.logged < 1) {
      const { notifications, setNotificationPermission, fetchtNewestNews } = this.props;
      if (!notifications.verified) {
        setNotificationPermission();
      }

      fetchtNewestNews();
    }
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

  componentDidMount() {
    this.setNotificationPermission();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setNotificationPermission();
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
