import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import { icons } from '../styles/general.js';
import FontIcon from 'material-ui/FontIcon';

const mapStateToProps = (state) => ({
  header: state.header,
  user: state.user,
  routing: state.routing,
});

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { setHeadersValues } = this.props;
    const headerValues = {
      title: 'CoffeeT',
      titleIcon: 'fa fa-tachometer',
      githubLink: 'https://github.com/jepz20/coffee_tracker',
      menuItems: [
        {
          label: 'News',
          icon: 'fa fa-newspaper-o',
          index: 0,
          route: '/news',
        }, {
          label: 'Map',
          icon: 'fa fa-map',
          index: 1,
          route: '/map',
        }, {
          label: 'Budget',
          icon: 'fa fa-money',
          index: 2,
          route: '/budget',
        }, {
          label: 'Events',
          icon: 'fa fa-clock-o',
          index: 3,
          route: '/events',
        }, {
          label: 'Graphs',
          icon: 'fa fa-bar-chart',
          index: 4,
          route: '/graphs',
        },
      ],
    };

    setHeadersValues(headerValues);
  }

  render() {
    const { logout, user, header, toggleDrawerOpen, closeDrawer, routing } = this.props;
    const displayName = user.userInfo.displayName && user.userInfo.displayName.split(' ')[0];
    const goToRoute = (route) => {
      if (routing.locationBeforeTransitions.pathname !== route) {
        hashHistory.push(route);
      }

      closeDrawer();
    };

    return (
      <header>
        <AppBar
          title= { header.title }
          onLeftIconButtonTouchTap = { toggleDrawerOpen }
          iconElementRight = {
            <div>
              <IconButton
                iconStyle={ icons.white }
                iconClassName='fa fa-sign-out'
                tooltip="logout"
                onTouchTap={ logout }
              />
              <IconButton
                iconStyle={ icons.white }
                style={{ paddingTop: 0 }}
                iconClassName='fa fa-github'
                href={ header.githubLink }
              />
            </div>
          }
        />
        <Drawer
          open={ header.drawerOpen }
          docked={false}
          onRequestChange={(open) => toggleDrawerOpen()}
        >
          <MenuItem
            onTouchTap={ () => goToRoute('/') }
          >
            <h2>{ `Hello ${displayName || ''}` }</h2>
          </MenuItem>
          {
            header.menuItems.map(item => (
              <MenuItem
                leftIcon={ <IconButton style={{ padding: 0 }} iconClassName={item.icon} /> }
                key={item.index}
                onTouchTap={ () => goToRoute(item.route) }
              >
                { item.label }
              </MenuItem>
            ))
        }
        </Drawer>
      </header>
    );
  }
}

Header = connect(mapStateToProps, actions)(Header);
export default Header;
