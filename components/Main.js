import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';

const mapStateToProps = (state) => ({
  routing: state.routing,
  user: state.user,
});

class MainSection extends React.Component {
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
    const { user, logout } = this.props;
    if (user.logged == -1) {
      return <div>Loading...</div>;
    }

    return (
        <main>
          <div>Hola Perrada</div>
          <button onClick={ logout }>Logout</button>
          { this.props.children}
        </main>
    );
  }
}

MainSection = connect(mapStateToProps, actions)(MainSection);

export default MainSection;
