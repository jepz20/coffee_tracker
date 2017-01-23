import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header.js';
import { hashHistory } from 'react-router';
import Loader from '../components/Loader';

const mapStateToProps = (state) => ({
  routing: state.routing,
  user: state.user,
  property: state.property,
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

    const { property, fetchPropertyById, params } = this.props;
    if (params.propertyId) {
      if (property.propertyDetail) {
        if (property.propertyDetail.id == params.propertyId) {
          return;
        }
      }

      fetchPropertyById(params.propertyId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.redirectIfNotLogin();
  }

  render() {
    const { user } = this.props;
    if (user.logged == -1) {
      return <Loader />;
    }

    const headerValues = {
      title: 'CoffeeT',
      titleIcon: 'fa fa-home',
      githubLink: 'https://github.com/jepz20/coffee_tracker',
      menuItems: [
        {
          label: 'News',
          icon: 'fa fa-newspaper-o',
          index: 0,
          route: '/news',
        }, {
          label: 'Properties',
          icon: 'fa fa-home',
          index: 1,
          route: '/properties',
        },
      ],
    };
    return (
      <div>
        <Header headerValues={ headerValues }/>
        <main>
          { this.props.children }
        </main>
      </div>
    );
  }
}

Main = connect(mapStateToProps, actions)(Main);

export default Main;
