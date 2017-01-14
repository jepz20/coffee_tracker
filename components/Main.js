import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header.js';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => ({
  routing: state.routing,
  user: state.user,
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.redirectIfNotLogin = this.redirectIfNotLogin.bind(this);
  }

  redirectIfNotLogin() {
    const { user, routing, setLastRoute } = this.props;
    const route = '/login';

    if (user.logged == 0 && routing.locationBeforeTransitions.pathname !== route) {
      setLastRoute(routing.locationBeforeTransitions.pathname);
      hashHistory.push(route);
    }
  }

  componentWillMount() {
    this.redirectIfNotLogin();
  }

  componentDidUpdate(prevProps, prevState) {
    this.redirectIfNotLogin();
  }

  render() {
    const { user } = this.props;
    if (user.logged == -1) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    );
  }
}

Main = connect(mapStateToProps, actions)(Main);

export default Main;
