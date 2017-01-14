import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import Login from './Login.js';
import Register from './Register.js';

const mapStateToProps = (state) => ({
  login: state.login,
  routing: state.routing,
  user: state.user,
  routeHistory: state.routeHistory,
});

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.redirectToPage = this.redirectToPage.bind(this);
  }

  redirectToPage() {
    const { user, routing, routeHistory } = this.props;
    if (user.logged == 1) {
      hashHistory.push(routeHistory);
    }
  }

  componentWillMount() {
    const { toggleShowLogin, routing } = this.props;
    this.redirectToPage();

    if (routing.locationBeforeTransitions.query.register) {
      toggleShowLogin();
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.redirectToPage();
  }

  render() {
    const { login, user } = this.props;
    if (user.logged == -1) {
      return <div>Loading...</div>;
    }

    if (login.showLogin) {
      return (
        <Login />
      );
    } else {
      return (
        <Register />
      );
    }
  }
}

Authentication = connect(mapStateToProps, actions)(Authentication);
export default Authentication;
