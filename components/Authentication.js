import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import Login from './Login.js';
import Register from './Register.js';

const mapStateToProps = (state) => ({
  login: state.login,
  routing: state.routing,
});

class Authentication extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { login } = this.props;
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
